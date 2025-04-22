import React, {useEffect, useState, useRef} from "react";
import {getNamesInArchive, getYearsInArchive, getArchive} from "../../services/API/archiveApi";
import GameCard from "../../components/ArchiveGameCard/ArchiveGameCard";
import styles from "./Archive.module.css";

function ArchivePage() {
    const [years, setYears] = useState([]);

    const [names, setNames] = useState([]);
    const [namesPage, setNamesPage] = useState(1);
    const [namesTotalPages, setNamesTotalPages] = useState(1);
    const [namesPerPage] = useState(20);
    const [isLoadingNames, setIsLoadingNames] = useState(false);

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedName, setSelectedName] = useState("");

    const [games, setGames] = useState([]);
    const [archivePage, setArchivePage] = useState(1);
    const [archiveTotalPages, setArchiveTotalPages] = useState(1);
    const [isLoadingGames, setIsLoadingGames] = useState(false);
    const [error, setError] = useState(null);

    const selectRef = useRef(null);

    useEffect(() => {
        getYearsInArchive()
            .then(response => setYears(response.data.Body.years || []))
            .catch(() => setError("Не удалось загрузить список лет."));
        loadNames(1);
    }, []);

    const loadNames = (page, append = false) => {
        if (isLoadingNames || page > namesTotalPages) return;
        setIsLoadingNames(true);
        getNamesInArchive(page, namesPerPage)
            .then(response => {
                const {names: fetched, page: current, pages_total} = response.data.Body;
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
            // load next page, do not update selectedName
            if (namesPage < namesTotalPages) {
                loadNames(namesPage + 1, true);
            }
            // ensure select value stays at previous selectedName
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
                const {games: fetched, page: current, pages_total} = response.data.Body;
                setGames(fetched || []);
                setArchivePage(current);
                setArchiveTotalPages(pages_total);
            })
            .catch(() => setError("Не удалось загрузить игры."))
            .finally(() => setIsLoadingGames(false));
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
                    onClick={() => loadArchiveGames(1)}
                    className={styles.showButton}
                    disabled={isLoadingGames}
                >
                    {isLoadingGames ? "Загрузка..." : "Показать игры"}
                </button>
            </div>

            {isLoadingGames ? (
                <div className={styles.loadingIndicator}>Загрузка игр...</div>
            ) : (
                games.length > 0 && (
                    <>
                        <div className={styles.gamesContainer}>
                            {games.map((game, idx) => (
                                <GameCard key={idx} game={game}/>
                            ))}
                        </div>
                        {archiveTotalPages > 1 && (
                            <div className={styles.gamesPagination}>
                                <button onClick={() => loadArchiveGames(archivePage - 1)} disabled={archivePage <= 1}>
                                    Предыдущая
                                </button>
                                <span>
                  Страница {archivePage} из {archiveTotalPages}
                </span>
                                <button onClick={() => loadArchiveGames(archivePage + 1)}
                                        disabled={archivePage >= archiveTotalPages}>
                                    Следующая
                                </button>
                            </div>
                        )}
                    </>
                )
            )}
        </div>
    );
}

export default ArchivePage;
