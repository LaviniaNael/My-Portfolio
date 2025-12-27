import React, { useState, useEffect, useCallback, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type Difficulty = 'easy' | 'medium' | 'hard';

const GRID_SIZE = 15;
const CELL_SIZE = 20;

// Speed in milliseconds (lower = faster)
const DIFFICULTY_SETTINGS = {
    easy: { speed: 180, label: 'Easy', color: 'text-green-400', description: 'Slow & relaxed' },
    medium: { speed: 100, label: 'Medium', color: 'text-yellow-400', description: 'Normal pace' },
    hard: { speed: 60, label: 'Hard', color: 'text-red-400', description: 'Fast & intense' }
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

                // Check wall collision
                if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                    setGameOver(true);
                    setIsPlaying(false);
                    setHighScores(prev => ({
                        ...prev,
                        [difficulty]: Math.max(prev[difficulty], score)
                    }));
                    return prevSnake;
                }

                // Check self collision
                if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    setIsPlaying(false);
                    setHighScores(prev => ({
                        ...prev,
                        [difficulty]: Math.max(prev[difficulty], score)
                    }));
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check food collision
                if (newHead.x === food.x && newHead.y === food.y) {
                    // Score multiplier based on difficulty
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

    // Focus game on mount
    useEffect(() => {
        if (gameRef.current) {
            gameRef.current.focus();
        }
    }, []);

    return (
        <div
            ref={gameRef}
            className="flex flex-col items-center gap-3 p-2 outline-none"
            tabIndex={0}
        >
            {/* Score Display */}
            <div className="flex justify-between w-full px-2 text-xs font-bold">
                <span className="text-win-accent">Score: {score}</span>
                <span className={DIFFICULTY_SETTINGS[difficulty].color}>
                    {DIFFICULTY_SETTINGS[difficulty].label}
                </span>
                <span className="text-win-secondary">Best: {highScores[difficulty]}</span>
            </div>

            {/* Game Board */}
            <div
                className="relative win-inset bg-black"
                style={{
                    width: GRID_SIZE * CELL_SIZE + 4,
                    height: GRID_SIZE * CELL_SIZE + 4,
                    padding: 2
                }}
            >
                {/* Grid */}
                <div
                    className="relative bg-gray-900"
                    style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
                >
                    {/* Food */}
                    <div
                        className="absolute rounded-full bg-red-500 animate-pulse"
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
                            className={`absolute rounded-sm ${index === 0 ? 'bg-green-400' : 'bg-green-500'}`}
                            style={{
                                left: segment.x * CELL_SIZE + 1,
                                top: segment.y * CELL_SIZE + 1,
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                                opacity: 1 - (index * 0.03)
                            }}
                        />
                    ))}

                    {/* Difficulty Selection / Game Over / Start Overlay */}
                    {!isPlaying && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 p-2">
                            {gameOver ? (
                                <>
                                    <span className="text-red-500 font-bold text-lg">GAME OVER</span>
                                    <span className="text-win-text text-xs">Score: {score}</span>
                                    {score === highScores[difficulty] && score > 0 && (
                                        <span className="text-yellow-400 text-[10px] animate-pulse">NEW HIGH SCORE!</span>
                                    )}
                                    <button
                                        onClick={resetGame}
                                        className="px-3 py-1 text-xs font-bold uppercase win-outset bg-win-surface hover:bg-win-accent hover:text-white transition-colors mt-2"
                                    >
                                        Play Again
                                    </button>
                                </>
                            ) : showDifficultySelect ? (
                                <>
                                    <span className="text-win-text font-bold text-sm mb-2">🐍 SNAKE</span>
                                    <span className="text-win-text/60 text-[10px] mb-2">Select Difficulty</span>

                                    <div className="flex flex-col gap-1 w-full max-w-[200px]">
                                        {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((diff) => (
                                            <button
                                                key={diff}
                                                onClick={() => startGame(diff)}
                                                className="w-full px-3 py-2 text-xs font-bold uppercase win-outset bg-win-surface hover:bg-win-accent hover:text-white transition-colors flex justify-between items-center"
                                            >
                                                <span className={DIFFICULTY_SETTINGS[diff].color}>
                                                    {DIFFICULTY_SETTINGS[diff].label}
                                                </span>
                                                <span className="text-[9px] opacity-60">
                                                    {DIFFICULTY_SETTINGS[diff].description}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* High Scores */}
                                    <div className="mt-3 text-[9px] text-win-text/50 text-center">
                                        <div>High Scores:</div>
                                        <div className="flex gap-3 mt-1">
                                            <span className="text-green-400">E: {highScores.easy}</span>
                                            <span className="text-yellow-400">M: {highScores.medium}</span>
                                            <span className="text-red-400">H: {highScores.hard}</span>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>

            {/* Controls Info */}
            <div className="text-[10px] text-win-text/60 text-center">
                <p>Use <span className="font-bold">Arrow Keys</span> or <span className="font-bold">WASD</span> to move</p>
            </div>

            {/* Mobile Controls */}
            <div className="grid grid-cols-3 gap-1 mt-1">
                <div />
                <button
                    onClick={() => direction !== 'DOWN' && setDirection('UP')}
                    className="w-8 h-8 win-outset bg-win-surface flex items-center justify-center text-xs font-bold hover:bg-win-highlight/20 active:win-inset"
                >
                    ▲
                </button>
                <div />
                <button
                    onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
                    className="w-8 h-8 win-outset bg-win-surface flex items-center justify-center text-xs font-bold hover:bg-win-highlight/20 active:win-inset"
                >
                    ◀
                </button>
                <button
                    onClick={() => direction !== 'UP' && setDirection('DOWN')}
                    className="w-8 h-8 win-outset bg-win-surface flex items-center justify-center text-xs font-bold hover:bg-win-highlight/20 active:win-inset"
                >
                    ▼
                </button>
                <button
                    onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
                    className="w-8 h-8 win-outset bg-win-surface flex items-center justify-center text-xs font-bold hover:bg-win-highlight/20 active:win-inset"
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default SnakeGame;
