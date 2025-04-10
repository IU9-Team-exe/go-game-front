import React, { useEffect, useState } from "react";
import { getNamesInArchive, getYearsInArchive, getArchive } from "../../services/API/archiveApi";
import GameCard from "../../components/ArchiveGameCard/ArchiveGameCard";
import styles from "./Archive.module.css";

function ArchivePage() {
    const [years, setYears] = useState([]);
    const [yearsLocalPage, setYearsLocalPage] = useState(1);
    const [yearsPerPage] = useState(10);

    const [names, setNames] = useState([]);
    const [namesPage, setNamesPage] = useState(1);
    const [namesTotalPages, setNamesTotalPages] = useState(1);
    const [namesPerPage] = useState(20); // Количество имен на странице

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
                console.log(response);
                setYears(response.data.Body.years);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить список лет.");
            });
        loadNames(1); // Загружаем первую страницу имен
    }, []);

    const loadNames = (page) => {
        getNamesInArchive(page, namesPerPage) // Передаем page и limit
            .then((response) => {
                const { names, page: currentPage, pages_total } = response.data.Body;
                setNames(names);
                setNamesPage(currentPage); // API возвращает 0-based page? Проверяем/корректируем
                setNamesTotalPages(pages_total);
            })
            .catch((err) => {
                 console.error(err);
                 setError("Не удалось загрузить список игроков.");
            });
    };

    const handleNamesPrev = () => {
        if (namesPage > 0) {
            loadNames(namesPage - 1);
        }
    };
    const handleNamesNext = () => {
        if (namesPage < namesTotalPages - 1) {
            loadNames(namesPage + 1);
        }
    };

    // Пагинация для лет (локальная)
    const handleYearsPrev = () => {
        setYearsLocalPage((prev) => Math.max(1, prev - 1));
    };
    const handleYearsNext = () => {
        const maxLocalPages = Math.ceil(years.length / yearsPerPage);
        setYearsLocalPage((prev) => Math.min(maxLocalPages - 1, prev + 1));
    };
    const visibleYears = years.slice(
        yearsLocalPage * yearsPerPage,
        (yearsLocalPage + 1) * yearsPerPage
    );
    const maxYearsLocalPages = Math.ceil(years.length / yearsPerPage);

    // Загрузка игр
    const loadArchiveGames = (page = 1) => {
        if (!selectedYear && !selectedName) {
            setError("Выберите год или имя игрока для поиска.");
            setGames([]); // Очищаем игры, если фильтры не выбраны
            setArchiveTotalPages(1);
            setArchivePage(1);
            return;
        }
        setError(null); // Сбрасываем ошибку
        setIsLoadingGames(true); // Устанавливаем флаг загрузки

        getArchive(selectedYear, selectedName, page)
            .then((response) => {
                const { games: fetchedGames, page: currentPage, pages_total } = response.data.Body;
                setGames(fetchedGames || []); // Убедимся, что games это массив
                setArchivePage(currentPage);
                setArchiveTotalPages(pages_total);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить игры.");
                setGames([]); // Очищаем игры при ошибке
             })
            .finally(() => {
                setIsLoadingGames(false); // Снимаем флаг загрузки
            });
    };

    const handleArchivePrev = () => {
        if (archivePage > 1) {
            loadArchiveGames(archivePage - 1);
        }
    };
    const handleArchiveNext = () => {
        if (archivePage < archiveTotalPages - 1) {
            loadArchiveGames(archivePage + 1);
        }
    };

    // Вызывается при клике на кнопку "Показать игры"
    const handleShowGames = () => {
        setArchivePage(1); // Сбрасываем страницу игр
        loadArchiveGames(1); // Загружаем первую страницу
    };

    return (
        <div className={`${styles.archiveContainer} main-container`}> {/* Добавлен main-container */}
            <h2>Архив профессиональных игр Го</h2>

            {error && <p className={styles.error}>{error}</p>}

            {/* Фильтры */}
            <div className={styles.filters}>
                {/* Фильтр по годам */}
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
                            <button onClick={handleYearsPrev} disabled={yearsLocalPage <= 0}>←</button>
                            <span>{yearsLocalPage + 1} / {maxYearsLocalPages}</span>
                            <button onClick={handleYearsNext} disabled={yearsLocalPage >= maxYearsLocalPages - 1}>→</button>
                        </div>
                    )}
                </div>

                {/* Фильтр по именам */}
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
                            <button onClick={handleNamesPrev} disabled={namesPage <= 0}>←</button>
                            <span>{namesPage + 1} / {namesTotalPages}</span>
                            <button onClick={handleNamesNext} disabled={namesPage >= namesTotalPages - 1}>→</button>
                        </div>
                    )}
                </div>

                {/* Кнопка поиска */}
                <button onClick={handleShowGames} className={styles.showButton} disabled={isLoadingGames}>
                    {isLoadingGames ? "Загрузка..." : "Показать игры"}
                </button>
            </div>

            {/* Контейнер с карточками игр */}
             {isLoadingGames ? (
                 <div className={styles.loadingIndicator}>Загрузка игр...</div>
             ) : games.length > 0 ? (
                <>
                    <div className={styles.gamesContainer}>
                        {games.map((game, index) => (
                            <GameCard key={index} game={game} />
                        ))}
                    </div>
                    {/* Пагинация игр */}
                    {archiveTotalPages > 1 && (
                         <div className={styles.gamesPagination}>
                             <button onClick={handleArchivePrev} disabled={archivePage <= 0}>
                                 Предыдущая
                             </button>
                             <span>Страница {archivePage + 1} из {archiveTotalPages}</span>
                             <button onClick={handleArchiveNext} disabled={archivePage >= archiveTotalPages - 1}>
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