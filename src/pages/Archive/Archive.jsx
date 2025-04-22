import React, {useEffect, useState} from "react";
import {getNamesInArchive, getYearsInArchive, getArchive} from "../../services/API/archiveApi";
import GameCard from "../../components/ArchiveGameCard/ArchiveGameCard";
import styles from "./Archive.module.css";

function ArchivePage() {
    const [years, setYears] = useState([]);
    const [yearsLocalPage, setYearsLocalPage] = useState(1);
    const [yearsPerPage] = useState(10);

    const [names, setNames] = useState([]);
    const [namesPage, setNamesPage] = useState(1);
    const [namesTotalPages, setNamesTotalPages] = useState(1);
    const [namesPerPage] = useState(20);

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedName, setSelectedName] = useState("");

    const [games, setGames] = useState([]);
    const [archivePage, setArchivePage] = useState(1);
    const [archiveTotalPages, setArchiveTotalPages] = useState(1);
    const [isLoadingGames, setIsLoadingGames] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getYearsInArchive()
            .then((response) => {
                setYears(response.data.Body.years || []);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить список лет.");
            });

        loadNames(1);
    }, []);

    const loadNames = (page) => {
        getNamesInArchive(page, namesPerPage)
            .then((response) => {
                const {names, page: currentPage, pages_total} = response.data.Body;
                setNames(names || []);
                setNamesPage(currentPage);
                setNamesTotalPages(pages_total);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить список игроков.");
            });
    };

    const handleNamesPrev = () => {
        if (namesPage > 1) {
            loadNames(namesPage - 1);
        }
    };
    const handleNamesNext = () => {
        if (namesPage < namesTotalPages) {
            loadNames(namesPage + 1);
        }
    };

    const handleYearsPrev = () => {
        setYearsLocalPage((prev) => Math.max(1, prev - 1));
    };
    const handleYearsNext = () => {
        const maxLocalPages = Math.ceil(years.length / yearsPerPage);
        setYearsLocalPage((prev) => Math.min(maxLocalPages, prev + 1));
    };
    const visibleYears = years.slice(
        (yearsLocalPage - 1) * yearsPerPage,
        yearsLocalPage * yearsPerPage
    );
    const maxYearsLocalPages = Math.ceil(years.length / yearsPerPage);

    const loadArchiveGames = (page = 1) => {
        if (!selectedYear && !selectedName) {
            setError("Выберите год или имя игрока для поиска.");
            setGames([]);
            setArchiveTotalPages(1);
            setArchivePage(1);
            return;
        }
        setError(null);
        setIsLoadingGames(true);

        getArchive(selectedYear, selectedName, page)
            .then((response) => {
                const {games: fetchedGames, page: currentPage, pages_total} = response.data.Body;
                setGames(fetchedGames || []);
                setArchivePage(currentPage);
                setArchiveTotalPages(pages_total);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить игры.");
                setGames([]);
            })
            .finally(() => {
                setIsLoadingGames(false);
            });
    };

    const handleArchivePrev = () => {
        if (archivePage > 1) {
            loadArchiveGames(archivePage - 1);
        }
    };
    const handleArchiveNext = () => {
        if (archivePage < archiveTotalPages) {
            loadArchiveGames(archivePage + 1);
        }
    };

    const handleShowGames = () => {
        setArchivePage(1);
        loadArchiveGames(1);
    };

    return (
        <div className={`${styles.archiveContainer} main-container`}>
            <h2>Архив профессиональных игр Го</h2>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.filters}>
                <div className={styles.filterBlock}>
                    <label htmlFor="year-select">Год:</label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="">Все года</option>
                        {visibleYears.map((y) => (
                            <option key={y.year} value={y.year}>
                                {y.year} ({y.count_of_games} игр)
                            </option>
                        ))}
                    </select>
                    {years.length > yearsPerPage && (
                        <div className={styles.paginationControls}>
                            <button onClick={handleYearsPrev} disabled={yearsLocalPage <= 1}>
                                ←
                            </button>
                            <span>
                                {yearsLocalPage} / {maxYearsLocalPages}
                            </span>
                            <button onClick={handleYearsNext} disabled={yearsLocalPage >= maxYearsLocalPages}>
                                →
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.filterBlock}>
                    <label htmlFor="name-select">Игрок:</label>
                    <select
                        id="name-select"
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="">Все игроки</option>
                        {names.map((player) => (
                            <option key={player.name} value={player.name}>
                                {player.name} ({player.count_of_games} игр)
                            </option>
                        ))}
                    </select>
                    {namesTotalPages > 1 && (
                        <div className={styles.paginationControls}>
                            <button onClick={handleNamesPrev} disabled={namesPage <= 1}>
                                ←
                            </button>
                            <span>
                                {namesPage} / {namesTotalPages}
                            </span>
                            <button onClick={handleNamesNext} disabled={namesPage >= namesTotalPages}>
                                →
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={handleShowGames} className={styles.showButton} disabled={isLoadingGames}>
                    {isLoadingGames ? "Загрузка..." : "Показать игры"}
                </button>
            </div>

            {isLoadingGames ? (
                <div className={styles.loadingIndicator}>Загрузка игр...</div>
            ) : games.length > 0 ? (
                <>
                    <div className={styles.gamesContainer}>
                        {games.map((game, index) => (
                            <GameCard key={index} game={game}/>
                        ))}
                    </div>
                    {archiveTotalPages > 1 && (
                        <div className={styles.gamesPagination}>
                            <button onClick={handleArchivePrev} disabled={archivePage <= 1}>
                                Предыдущая
                            </button>
                            <span>
                                Страница {archivePage} из {archiveTotalPages}
                            </span>
                            <button onClick={handleArchiveNext} disabled={archivePage >= archiveTotalPages}>
                                Следующая
                            </button>
                        </div>
                    )}
                </>
            ) : !isLoadingGames && (selectedYear || selectedName) ? (
                <p className={styles.noGamesMessage}>Игры по заданным фильтрам не найдены.</p>
            ) : null}
        </div>
    );
}

export default ArchivePage;