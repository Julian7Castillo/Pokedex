import react, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar controlador y modelo
import { getPokemons } from '../controllers/getpokemon';
import { Pokemon } from '../models/pokemon.m';
import Figure from 'react-bootstrap/Figure';

/*
* Metodo slice() devuelve una copia de una parte del array dentro de un nuevo array
*/
const Listado = () => {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [query, setQuery] = useState("");
    // Llamar controlador y obtener todos los pokemons
    useEffect(() => {
        const obtenerTodos = async() => {
            const allPokemons = await getPokemons();
            setPokemons(allPokemons);
        }
        obtenerTodos();
    });

    const filtrarPokemon = pokemons?.slice(0, 900).filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLowerCase());
    });

    return(
        <>
            <header>
                <h1>Pokedex</h1>
                <input
                    className='buscador'
                    value={query}
                    placeholder='Buscar pokemón'
                    onChange={(event) => setQuery(event.target.value.trim())}
                    type="text"
                />
            </header>
            <main className="content-wrapper">
                <div className="content">
                    <div className="row gap-3">
                        {filtrarPokemon?.slice(0, 900).map((pokemons) => (
                            <button className="mx-auto boton" style={{ width: '18rem' }}>
                            <Card className="mx-auto" style={{ width: '18rem' }}>
                            <Card.Header># {pokemons.id}</Card.Header>
                            <Card.Img width="80" height="100" variant="top" src={pokemons.imggif} className="d-block mx-auto w-50" />
                            <Card.Body>
                                <Card.Title className="text-center"><b>{pokemons.name}</b></Card.Title>
                                <div className='tipos'>
                                    <b>Tipo:</b> 
                                    <div className={`tipo ${pokemons.type1}`}>
                                        {pokemons.type1}
                                    </div>
                                    {pokemons.type2 && (
                                        <div className={`tipo ${pokemons.type2}`}>
                                            {pokemons.type2}
                                        </div>
                                    )}
                                </div>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={16}
                                            height={16}
                                            src="https://cdn-icons-png.flaticon.com/128/833/833472.png"
                                            /><b> HP:</b> {pokemons.hp}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={16}
                                            height={16}
                                            src="https://cdn-icons-png.flaticon.com/128/297/297837.png"
                                            /><b> Ataque:</b> {pokemons.attack}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={16}
                                            height={16}
                                            src="https://cdn-icons-png.flaticon.com/128/5448/5448364.png"
                                            /><b> Defensa:</b> {pokemons.defense}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={16}
                                            height={16}
                                            src="https://cdn-icons-png.flaticon.com/128/1457/1457939.png"
                                            /><b> E. Ataque:</b> {pokemons.sp_atk}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={16}
                                            height={16}
                                            src="https://cdn-icons-png.flaticon.com/128/1469/1469840.png"
                                            /><b> E. Defensa:</b> {pokemons.sp_def}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <Figure.Image
                                            width={16}
                                            height={16}
                                            src="https://cdn-icons-png.flaticon.com/128/3563/3563460.png"
                                            /><b> Velocidad:</b> {pokemons.speed}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            </Card>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Listado;