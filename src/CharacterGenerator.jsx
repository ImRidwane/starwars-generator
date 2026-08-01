import { useState } from "react";
import "./CharacterGenerator.css";

function CharacterGenerator() {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateCharacter = async () => {
        setLoading(true);
        setError(null);

        const randomNumber = Math.ceil(Math.random() * 88);

        try {
            const response = await fetch(
                `https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/id/${randomNumber}.json`
            );

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            setCharacter(data);
        } catch (err) {
            setError("Something went wrong fetching the character.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="character-generator">
            <h1 className="name">{character ? character.name : ""}</h1>

            <button onClick={generateCharacter} disabled={loading}>
                {loading ? "Generating..." : "Generate Character"}
            </button>

            {error && <p className="error">{error}</p>}

            {character && (
                <div className="character-details">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="character-img"
                    />
                    <ul>
                        <li>Height: {character.height} cm</li>
                        <li>Mass: {character.mass} kg</li>
                        <li>Gender: {character.gender}</li>
                        <li>Birth Year: {character.born}</li>
                        <li>Homeworld: {character.homeworld}</li>
                        <li>Species: {character.species}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CharacterGenerator;