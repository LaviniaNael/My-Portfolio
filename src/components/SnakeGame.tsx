import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SnakeGame.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type Difficulty = 'easy' | 'medium' | 'hard';

const GRID_SIZE = 15;
const CELL_SIZE = 20;

// Speed in milliseconds (lower = faster)
const DIFFICULTY_SETTINGS = {
    easy: { speed: 180, label: 'Easy', className: 'text-easy', description: 'Slow & relaxed' },
    medium: { speed: 100, label: 'Medium', className: 'text-medium', description: 'Normal pace' },
    hard: { speed: 60, label: 'Hard', className: 'text-hard', description: 'Fast & intense' }
};

const SnakeGame: React.FC = () => {
    const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
    const [food, setFood] = useState<Position>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScores, setHighScores] = useState<Record<Difficulty, number>>({ easy: 0, medium: 0, hard: 0 });
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [showDifficultySelect, setShowDifficultySelect] = useState(true);
    const gameRef = useRef<HTMLDivElement>(null);

    const generateFood = useCallback((currentSnake: Position[]): Position => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, []);

    const startGame = useCallback((selectedDifficulty: Difficulty) => {
        const initialSnake = [{ x: 7, y: 7 }];
        setDifficulty(selectedDifficulty);
        setSnake(initialSnake);
        setFood(generateFood(initialSnake));
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setShowDifficultySelect(false);
        setIsPlaying(true);
    }, [generateFood]);

    const resetGame = useCallback(() => {
        setShowDifficultySelect(true);
        setIsPlaying(false);
        setGameOver(false);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isPlaying) return;

        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (direction !== 'DOWN') setDirection('UP');
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (direction !== 'UP') setDirection('DOWN');
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (direction !== 'RIGHT') setDirection('LEFT');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (direction !== 'LEFT') setDirection('RIGHT');
                break;
        }
    }, [direction, isPlaying]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const moveSnake = () => {
            setSnake(prevSnake => {
                const head = prevSnake[0];
                let newHead: Position;

                switch (direction) {
                    case 'UP':
                        newHead = { x: head.x, y: head.y - 1 };
                        break;
                    case 'DOWN':
                        newHead = { x: head.x, y: head.y + 1 };
                        break;
                    case 'LEFT':
                        newHead = { x: head.x - 1, y: head.y };
                        break;
                    case 'RIGHT':
                        newHead = { x: head.x + 1, y: head.y };
                        break;
                }

                if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                    setGameOver(true);
                    setIsPlaying(false);
                    setHighScores(prev => ({ ...prev, [difficulty]: Math.max(prev[difficulty], score) }));
                    return prevSnake;
                }

                if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    setIsPlaying(false);
                    setHighScores(prev => ({ ...prev, [difficulty]: Math.max(prev[difficulty], score) }));
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                if (newHead.x === food.x && newHead.y === food.y) {
                    const baseScore = difficulty === 'hard' ? 15 : difficulty === 'medium' ? 10 : 5;
                    setScore(prev => prev + baseScore);
                    setFood(generateFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        const gameInterval = setInterval(moveSnake, DIFFICULTY_SETTINGS[difficulty].speed);
        return () => clearInterval(gameInterval);
    }, [isPlaying, gameOver, direction, food, generateFood, score, difficulty]);

    useEffect(() => {
        if (gameRef.current) {
            gameRef.current.focus();
        }
    }, []);

    return (
        <div ref={gameRef} className="snake-game-wrapper" tabIndex={0}>
            {/* Score Display */}
            <div className="score-board">
                <span className="current-score">Score: {score}</span>
                <span className={DIFFICULTY_SETTINGS[difficulty].className}>
                    {DIFFICULTY_SETTINGS[difficulty].label}
                </span>
                <span className="best-score">Best: {highScores[difficulty]}</span>
            </div>

            {/* Game Board */}
            <div className="game-board-container win-inset"
                style={{ width: GRID_SIZE * CELL_SIZE + 4, height: GRID_SIZE * CELL_SIZE + 4, padding: 2 }}>
                <div className="game-grid"
                    style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>

                    {/* Food */}
                    <div className="snake-food animate-pulse"
                        style={{
                            left: food.x * CELL_SIZE + 2,
                            top: food.y * CELL_SIZE + 2,
                            width: CELL_SIZE - 4,
                            height: CELL_SIZE - 4
                        }}
                    />

                    {/* Snake */}
                    {snake.map((segment, index) => (
                        <div
                            key={index}
                            className={`snake-segment ${index === 0 ? 'snake-head' : 'snake-body'}`}
                            style={{
                                left: segment.x * CELL_SIZE + 1,
                                top: segment.y * CELL_SIZE + 1,
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                                opacity: 1 - (index * 0.03)
                            }}
                        />
                    ))}

                    {!isPlaying && (
                        <div className="game-overlay">
                            {gameOver ? (
                                <>
                                    <span className="game-over-text">GAME OVER</span>
                                    <span className="game-score-text">Score: {score}</span>
                                    {score === highScores[difficulty] && score > 0 && (
                                        <span className="new-high-score animate-pulse">NEW HIGH SCORE!</span>
                                    )}
                                    <button onClick={resetGame} className="play-again-btn win-outset">
                                        Play Again
                                    </button>
                                </>
                            ) : showDifficultySelect ? (
                                <>
                                    <span className="game-title">🐍 SNAKE</span>
                                    <span className="difficulty-label">Select Difficulty</span>

                                    <div className="difficulty-options">
                                        {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((diff) => (
                                            <button
                                                key={diff}
                                                onClick={() => startGame(diff)}
                                                className="difficulty-btn win-outset"
                                            >
                                                <span className={DIFFICULTY_SETTINGS[diff].className}>
                                                    {DIFFICULTY_SETTINGS[diff].label}
                                                </span>
                                                <span className="difficulty-desc">
                                                    {DIFFICULTY_SETTINGS[diff].description}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="high-scores-summary">
                                        <div>High Scores:</div>
                                        <div className="high-scores-list">
                                            <span className="text-easy">E: {highScores.easy}</span>
                                            <span className="text-medium">M: {highScores.medium}</span>
                                            <span className="text-hard">H: {highScores.hard}</span>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>

            <div className="controls-hint">
                <p>Use <span className="font-bold">Arrow Keys</span> or <span className="font-bold">WASD</span> to move</p>
            </div>

            <div className="mobile-controls">
                <div />
                <button
                    onClick={() => direction !== 'DOWN' && setDirection('UP')}
                    className="mobile-dir-btn win-outset"
                >▲</button>
                <div />
                <button
                    onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
                    className="mobile-dir-btn win-outset"
                >◀</button>
                <button
                    onClick={() => direction !== 'UP' && setDirection('DOWN')}
                    className="mobile-dir-btn win-outset"
                >▼</button>
                <button
                    onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
                    className="mobile-dir-btn win-outset"
                >▶</button>
            </div>
        </div>
    );
};

export default SnakeGame;
