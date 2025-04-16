import { promises as fs } from 'fs';
import * as path from 'path';
import { Pokemon, Pokedex } from './pokedex';

const SAVE_DIR = path.resolve(__dirname);
const SAVE_FILE = path.join(SAVE_DIR, 'pokedex-data.json');

export class PokedexWithPersistence extends Pokedex {
    private async ensureDirectoryExists(): Promise<void> {
        try {
            await fs.access(SAVE_DIR);
        } catch {
            await fs.mkdir(SAVE_DIR, { recursive: true });
        }
    }

    public async saveToFile(): Promise<void> {
        try {
            await this.ensureDirectoryExists();
            
            const data = {
                pokemons: super.listarPokemons(),
                proximoId: (this as any).proximoId
            };
            
            await fs.writeFile(SAVE_FILE, JSON.stringify(data, null, 2), 'utf-8');
            
            console.log(`Dados salvos em: ${SAVE_FILE}`);
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            throw error;
        }
    }

    private async loadFromFile(): Promise<void> {
        try {
            await fs.access(SAVE_FILE);
            const rawData = await fs.readFile(SAVE_FILE, 'utf-8');
            
            if (!rawData.trim()) {
                console.log('Arquivo vazio - iniciando nova Pokedex');
                return;
            }

            const { pokemons, proximoId } = JSON.parse(rawData);
            
            if (!Array.isArray(pokemons) || typeof proximoId !== 'number') {
                throw new Error('Formato inválido dos dados salvos');
            }

            const restoredPokemons = pokemons.map((p: any) => ({
                ...p,
                dataCadastro: new Date(p.dataCadastro),
                ultimoTreino: p.ultimoTreino ? new Date(p.ultimoTreino) : undefined,
                ultimoDescanso: p.ultimoDescanso ? new Date(p.ultimoDescanso) : undefined
            }));

            (this as any).pokemons = restoredPokemons;
            (this as any).proximoId = proximoId;
            
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                console.log('Arquivo não encontrado - criando nova Pokedex');
            } else {
                console.error('Erro ao carregar:', error);
            }
        }
    }
    public async initialize(): Promise<void> {
        await this.loadFromFile();
    }

    public adicionarPokemon(nome: string, tipos: string[], nivel: number): Pokemon {
        const result = super.adicionarPokemon(nome, tipos, nivel);
        this.saveToFile().catch(e => console.error('Erro ao salvar:', e));
        return result;
    }

    public treinarPokemon(id: number, experienciaGanha: number): { pokemon: Pokemon, subiuNivel: boolean } {
        const result = super.treinarPokemon(id, experienciaGanha);
        this.saveToFile().catch(e => console.error('Erro ao salvar:', e));
        return result;
    }

    public descansarPokemon(id: number, horas: number = 8): Pokemon {
        const result = super.descansarPokemon(id, horas);
        this.saveToFile().catch(e => console.error('Erro ao salvar:', e));
        return result;
    }

    public async iniciarBatalha(idPokemonHeroi: number, nivelOponente?: number): Promise<{ vencedor: Pokemon, perdedor: Pokemon, xpGanho: number }> {
        const result = await super.iniciarBatalha(idPokemonHeroi, nivelOponente);
        await this.saveToFile();
        return result;
    }

    public removerPokemon(id: number): boolean {
        const result = super.removerPokemon(id);
        this.saveToFile().catch(e => console.error('Erro ao salvar:', e));
        return result;
    }
}

export function createPokedexWithPersistence(): PokedexWithPersistence {
    const pokedex = new PokedexWithPersistence();
    pokedex.initialize();
    return pokedex;
}