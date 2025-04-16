import { PokedexWithPersistence } from './pokedex-persistence';

export async function createPokedex(): Promise<PokedexWithPersistence> {
    const pokedex = new PokedexWithPersistence();
    await pokedex.initialize();
    return pokedex;
}