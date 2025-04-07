import React, { useEffect, useState } from "react";
import { getNamesInArchive, getYearsInArchive, getArchive } from "../../services/API/archiveApi";
import GameCard from "../../components/ArchiveGameCard/ArchiveGameCard";
import styles from "./Archive.module.css";

function ArchivePage() {
    const [years, setYears] = useState([]);
    const [yearsLocalPage, setYearsLocalPage] = useState(0);
    const [yearsPerPage] = useState(10);

    const [names, setNames] = useState([]);
    const [namesPage, setNamesPage] = useState(0);
    const [namesTotalPages, setNamesTotalPages] = useState(0);

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedName, setSelectedName] = useState("");

    const [games, setGames] = useState([]);
    const [archivePage, setArchivePage] = useState(0);
    const [archiveTotalPages, setArchiveTotalPages] = useState(0);

    useEffect(() => {
        getYearsInArchive()
            .then((response) => {
                setYears(response.data.years);
            })
            .catch((err) => console.error(err));
        loadNames(1);
    }, []);

    const loadNames = (page) => {
        getNamesInArchive(page)
            .then((response) => {
                const { names, page, pages_total } = response.data;
                setNames(names);
                setNamesPage(page);
                setNamesTotalPages(pages_total);
            })
            .catch((err) => console.error(err));
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

    const handleYearsPrev = () => {
        if (yearsLocalPage > 0) {
            setYearsLocalPage(yearsLocalPage - 1);
        }
    };
    const handleYearsNext = () => {
        const maxLocalPages = Math.ceil(years.length / yearsPerPage);
        if (yearsLocalPage < maxLocalPages - 1) {
            setYearsLocalPage(yearsLocalPage + 1);
        }
    };
    const visibleYears = years.slice(
        yearsLocalPage * yearsPerPage,
        yearsLocalPage * yearsPerPage + yearsPerPage
    );

    const loadArchiveGames = (page = 0) => {
        if (!selectedYear && !selectedName) {
            alert("Выберите год или имя игрока!");
            return;
        }

        getArchive(selectedYear, selectedName, page)
            .then((response) => {
                const { games, page, pages_total } = response.data;
                setGames(games);
                setArchivePage(page);
                setArchiveTotalPages(pages_total);
            })
            .catch((err) => console.error(err));
    };

    const handleArchivePrev = () => {
        if (archivePage > 0) {
            loadArchiveGames(archivePage - 1);
        }
    };
    const handleArchiveNext = () => {
        if (archivePage < archiveTotalPages - 1) {
            loadArchiveGames(archivePage + 1);
        }
    };

    const handleShowGames = () => {
        setArchivePage(0);
        loadArchiveGames(0);
    };

    return (
        <div className={styles.archiveContainer}>
            <h2>Архив профессиональных игр</h2>

            <div className={styles.filters}>
                <div className={styles.filterBlock}>
                    <label>Год:</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Не выбрано</option>
                        {visibleYears.map((y) => (
                            <option key={y.year} value={y.year}>
                                {y.year} (игр: {y.count_of_games})
                            </option>
                        ))}
                    </select>
                    <div>
                        <button onClick={handleYearsPrev}>Предыдущие</button>
                        <button onClick={handleYearsNext}>Следующие</button>
                    </div>
                </div>

                <div className={styles.filterBlock}>
                    <label>Имя игрока:</label>
                    <select
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                    >
                        <option value="">Не выбрано</option>
                        {names.map((player) => (
                            <option key={player.name} value={player.name}>
                                {player.name} (игр: {player.count_of_games})
                            </option>
                        ))}
                    </select>
                    <div>
                        <button onClick={handleNamesPrev} disabled={namesPage <= 0}>
                            ←
                        </button>
                        <span>{namesPage + 1} / {namesTotalPages}</span>
                        <button
                            onClick={handleNamesNext}
                            disabled={namesPage >= namesTotalPages - 1}
                        >
                            →
                        </button>
                    </div>
                </div>

                <button onClick={handleShowGames}>Показать игры</button>
            </div>

            <div className={styles.gamesContainer}>
                {games.map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </div>

            {games.length > 0 && (
                <div className={styles.gamesPagination}>
                    <button onClick={handleArchivePrev} disabled={archivePage <= 0}>
                        Предыдущая
                    </button>
                    <span>
            Страница {archivePage + 1} из {archiveTotalPages}
          </span>
                    <button
                        onClick={handleArchiveNext}
                        disabled={archivePage >= archiveTotalPages - 1}
                    >
                        Следующая
                    </button>
                </div>
            )}
        </div>
    );
}

export default ArchivePage;
