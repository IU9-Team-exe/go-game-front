import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getNamesInArchive, getYearsInArchive, getArchive } from "../../services/API/archiveApi";
import GameCard from "../../components/ArchiveGameCard/ArchiveGameCard";
import styles from "./Archive.module.css";

function ArchivePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialYear = searchParams.get("year") || "";
    const initialName = searchParams.get("name") || "";
    const initialPage = parseInt(searchParams.get("page"), 10) || 1;

    const [years, setYears] = useState([]);

    const [names, setNames] = useState([]);
    const [namesPage, setNamesPage] = useState(1);
    const [namesTotalPages, setNamesTotalPages] = useState(1);
    const [namesPerPage] = useState(20);
    const [isLoadingNames, setIsLoadingNames] = useState(false);

    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [selectedName, setSelectedName] = useState(initialName);

    const [games, setGames] = useState([]);
    const [archivePage, setArchivePage] = useState(initialPage);
    const [archiveTotalPages, setArchiveTotalPages] = useState(1);
    const [isLoadingGames, setIsLoadingGames] = useState(false);
    const [error, setError] = useState(null);

    const selectRef = useRef(null);

    useEffect(() => {
        getYearsInArchive()
            .then(response => setYears(response.data.Body.years.reverse() || []))
            .catch(() => setError("Не удалось загрузить список лет."));
        loadNames(1);
        if (initialYear || initialName) {
            loadArchiveGames(initialPage);
        }
    }, []);

    const loadNames = (page, append = false) => {
        if (isLoadingNames || page > namesTotalPages) return;
        setIsLoadingNames(true);
        getNamesInArchive(page, namesPerPage)
            .then(response => {
                const { names: fetched, page: current, pages_total } = response.data.Body;
                setNames(prev => append ? [...prev, ...(fetched || [])] : (fetched || []));
                setNamesPage(current);
                setNamesTotalPages(pages_total);
            })
            .catch(() => setError("Не удалось загрузить список игроков."))
            .finally(() => setIsLoadingNames(false));
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value === "__LOAD_MORE__") {
            if (namesPage < namesTotalPages) {
                loadNames(namesPage + 1, true);
            }
            setTimeout(() => {
                if (selectRef.current) {
                    selectRef.current.value = selectedName;
                }
            }, 0);
        } else {
            setSelectedName(value);
        }
    };

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
            .then(response => {
                const { games: fetched, page: current, pages_total } = response.data.Body;
                setGames(fetched || []);
                setArchivePage(current);
                setArchiveTotalPages(pages_total);
                const params = {};
                if (selectedYear) params.year = selectedYear;
                if (selectedName) params.name = selectedName;
                params.page = String(current);
                setSearchParams(params);
            })
            .catch(() => {
                setError("Не удалось загрузить игры.");
                setGames([]);
            })
            .finally(() => setIsLoadingGames(false));
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
                        onChange={e => setSelectedYear(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="">Все года</option>
                        {years.map(y => (
                            <option key={y.year} value={y.year}>
                                {y.year} ({y.count_of_games} игр)
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterBlock}>
                    <label htmlFor="name-select">Игрок:</label>
                    <select
                        id="name-select"
                        ref={selectRef}
                        value={selectedName}
                        onChange={handleNameChange}
                        className={styles.selectInput}
                    >
                        <option value="">Все игроки</option>
                        {names.map(player => (
                            <option key={player.name} value={player.name}>
                                {player.name} ({player.count_of_games} игр)
                            </option>
                        ))}
                        {namesPage < namesTotalPages && (
                            <option value="__LOAD_MORE__" disabled={isLoadingNames}>
                                {isLoadingNames ? "Загрузка…" : "Загрузить игроков…"}
                            </option>
                        )}
                    </select>
                </div>

                <button
                    onClick={handleShowGames}
                    className={styles.showButton}
                    disabled={isLoadingGames}
                >
                    {isLoadingGames ? "Загрузка..." : "Показать игры"}
                </button>
            </div>

            {isLoadingGames ? (
                <div className={styles.loadingIndicator}>Загрузка игр...</div>
            ) : (
                games.length > 0 ? (
                    <>
                        <div className={styles.gamesContainer}>
                            {games.map((game, idx) => (
                                <GameCard key={idx} game={game} />
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
                ) : (
                    !isLoadingGames && (selectedYear || selectedName) && (
                        <p className={styles.noGamesMessage}>Игры по заданным фильтрам не найдены.</p>
                    )
                )
            )}
        </div>
    );
}

export default ArchivePage;
