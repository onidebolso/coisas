import { faker } from '@faker-js/faker';

export type Pokemon = {
    id: number;
    nome: string;
    tipo: string[];
    nivel: number;
    experiencia: number;
    energia: number;
    ataque: number;
    defesa: number;
    dataCadastro: Date;
    ultimoTreino?: Date;
    ultimoDescanso?: Date;
    emBatalha: boolean;
};

export class Pokedex {
    private pokemons: Pokemon[];
    private proximoId: number;
    private readonly EXPERIENCIA_POR_NIVEL = 100;
    private readonly ENERGIA_MAXIMA = 100;
    private readonly ENERGIA_POR_TREINO = 10;
    private readonly ENERGIA_POR_DESCANSO = 30;
    private readonly BONUS_DESCANSO = 1.2;
    private readonly XP_VITORIA = 2;
    private readonly XP_DERROTA = 0.1;

    constructor() {
        this.pokemons = [];
        this.proximoId = 1;
    }

    adicionarPokemon(nome: string, tipos: string[], nivel: number): Pokemon {
        if (nivel <= 0) {
            throw new Error("Nível deve ser maior que zero");
        }

        if (tipos.length === 0) {
            throw new Error("Pokémon deve ter pelo menos um tipo");
        }

        const novoPokemon: Pokemon = {
            id: this.proximoId++,
            nome,
            tipo: tipos,
            nivel,
            experiencia: 0,
            energia: this.ENERGIA_MAXIMA,
            ataque: 50 + Math.floor(Math.random() * 20),
            defesa: 50 + Math.floor(Math.random() * 20),
            dataCadastro: new Date(),
            emBatalha: false
        };

        this.pokemons.push(novoPokemon);
        return novoPokemon;
    }

    gerarPokemonAleatorio(nivel?: number): Pokemon {
        const tipos = ['Fogo', 'Água', 'Planta', 'Elétrico', 'Psíquico', 'Voador', 'Venenoso', 'Pedra'];
        const tipo1 = faker.helpers.arrayElement(tipos);
        let tipo2: string | undefined = faker.helpers.arrayElement([...tipos, undefined]);
  
        if (tipo2 === tipo1) {
            tipo2 = undefined;
        }

        const tiposPokemon = tipo2 ? [tipo1, tipo2] : [tipo1];
        const nivelAleatorio = nivel || faker.number.int({ min: 1, max: 50 });

        return {
            id: this.proximoId++,
            nome: faker.person.firstName(),
            tipo: tiposPokemon,
            nivel: nivelAleatorio,
            experiencia: 0,
            energia: this.ENERGIA_MAXIMA,
            ataque: 50 + Math.floor(Math.random() * 20),
            defesa: 50 + Math.floor(Math.random() * 20),
            dataCadastro: new Date(),
            emBatalha: false
        };
    }

    treinarPokemon(id: number, experienciaGanha: number): { pokemon: Pokemon, subiuNivel: boolean } {
        const pokemon = this.obterPokemonPorId(id);
        
        if (pokemon.emBatalha) {
            throw new Error(`${pokemon.nome} está em batalha e não pode treinar agora!`);
        }

        if (experienciaGanha <= 0) {
            throw new Error("Experiência ganha deve ser maior que zero");
        }

        if (pokemon.energia < this.ENERGIA_POR_TREINO) {
            throw new Error(`${pokemon.nome} está cansado e precisa descansar antes de treinar (Energia: ${pokemon.energia}/${this.ENERGIA_MAXIMA})`);
        }

        let subiuNivel = false;
        let experienciaEfetiva = experienciaGanha;

        if (pokemon.ultimoDescanso && 
            new Date().getTime() - pokemon.ultimoDescanso.getTime() < 24 * 60 * 60 * 1000) {
            experienciaEfetiva = Math.floor(experienciaGanha * this.BONUS_DESCANSO);
            console.log(`${pokemon.nome} está descansado e ganha 20% mais XP!`);
        }

        pokemon.experiencia += experienciaEfetiva;
        pokemon.energia -= this.ENERGIA_POR_TREINO;
        pokemon.ultimoTreino = new Date();

        while (pokemon.experiencia >= this.EXPERIENCIA_POR_NIVEL * pokemon.nivel) {
            pokemon.experiencia -= this.EXPERIENCIA_POR_NIVEL * pokemon.nivel;
            pokemon.nivel++;
            pokemon.ataque += 5 + Math.floor(Math.random() * 3);
            pokemon.defesa += 5 + Math.floor(Math.random() * 3);
            subiuNivel = true;
            console.log(`Parabéns! ${pokemon.nome} subiu para o nível ${pokemon.nivel}!`);
        }

        return { pokemon, subiuNivel };
    }

    descansarPokemon(id: number, horas: number = 8): Pokemon {
        const pokemon = this.obterPokemonPorId(id);
        
        if (pokemon.emBatalha) {
            throw new Error(`${pokemon.nome} está em batalha e não pode descansar agora!`);
        }

        if (horas <= 0) {
            throw new Error("Tempo de descanso deve ser maior que zero");
        }

        const energiaRecuperada = Math.min(
            this.ENERGIA_POR_DESCANSO * horas,
            this.ENERGIA_MAXIMA - pokemon.energia
        );

        pokemon.energia += energiaRecuperada;
        pokemon.ultimoDescanso = new Date();

        console.log(`${pokemon.nome} descansou por ${horas} horas e recuperou ${energiaRecuperada} de energia.`);
        console.log(`Energia atual: ${pokemon.energia}/${this.ENERGIA_MAXIMA}`);

        return pokemon;
    }

    async iniciarBatalha(idPokemonHeroi: number, nivelOponente?: number): Promise<{ vencedor: Pokemon, perdedor: Pokemon, xpGanho: number }> {
        const heroi = this.obterPokemonPorId(idPokemonHeroi);
        
        if (heroi.energia < 5) {
            throw new Error(`${heroi.nome} está com energia muito baixa para batalhar!`);
        }

        if (heroi.emBatalha) {
            throw new Error(`${heroi.nome} já está em uma batalha!`);
        }

        const oponente = this.gerarPokemonAleatorio(nivelOponente);
        console.log(`Um selvagem ${oponente.nome} (Nível ${oponente.nivel}) apareceu!`);
        console.log(`Batalha entre ${heroi.nome} (Nível ${heroi.nivel}) vs ${oponente.nome} (Nível ${oponente.nivel})`);

        heroi.emBatalha = true;
        oponente.emBatalha = true;

        let turno = 1;
        let atacante: Pokemon;
        let defensor: Pokemon;

        while (heroi.energia >= 5 && oponente.energia > 0) {
            console.log(`\n--- Turno ${turno} ---`);
   
            const dado = faker.number.int({ min: 1, max: 100 });
            if (dado <= 50) {
                atacante = heroi;
                defensor = oponente;
                console.log(`${heroi.nome} ataca primeiro neste turno!`);
            } else {
                atacante = oponente;
                defensor = heroi;
                console.log(`${oponente.nome} ataca primeiro neste turno!`);
            }

            await this.realizarAtaque(atacante, defensor);

            if (defensor.energia <= (defensor === heroi ? 5 : 0)) {
                break;
            }

            [atacante, defensor] = [defensor, atacante];

            if (defensor.energia > (defensor === heroi ? 5 : 0)) {
                await this.realizarAtaque(atacante, defensor);
            }

            turno++;
            await new Promise(resolve => setTimeout(resolve, 1000)); 
        }

        let vencedor, perdedor, xpGanho = 0;

        if (heroi.energia < 5) {
            heroi.energia = 1;
            vencedor = oponente;
            perdedor = heroi;
      
            const xpPerdido = Math.floor(perdedor.experiencia * this.XP_DERROTA);
            perdedor.experiencia = Math.max(0, perdedor.experiencia - xpPerdido);
            console.log(`\n${heroi.nome} foi derrotado e perdeu ${xpPerdido} XP!`);
        } else {
            oponente.energia = 0;
            vencedor = heroi;
            perdedor = oponente;
     
            xpGanho = perdedor.nivel * this.XP_VITORIA;
            vencedor.experiencia += xpGanho;
            console.log(`\n${heroi.nome} venceu a batalha e ganhou ${xpGanho} XP!`);
           
            if (vencedor.experiencia >= this.EXPERIENCIA_POR_NIVEL * vencedor.nivel) {
                const resultado = this.treinarPokemon(vencedor.id, 0); 
                if (resultado.subiuNivel) {
                    console.log(`Parabéns! ${vencedor.nome} subiu para o nível ${vencedor.nivel}!`);
                }
            }
        }

        heroi.emBatalha = false;
        oponente.emBatalha = false;

        console.log(`\n--- Fim da Batalha ---`);
        console.log(`Vencedor: ${vencedor.nome} (Energia: ${vencedor.energia}/${this.ENERGIA_MAXIMA})`);
        console.log(`Perdedor: ${perdedor.nome} (Energia: ${perdedor.energia}/${perdedor === oponente ? 0 : this.ENERGIA_MAXIMA})`);

        return { vencedor, perdedor, xpGanho };
    }


    private async realizarAtaque(atacante: Pokemon, defensor: Pokemon): Promise<void> {

        const ataqueTotal = atacante.ataque * atacante.nivel;
        const defesaTotal = defensor.defesa * defensor.nivel;
        
        let dano = Math.max(1, Math.floor((ataqueTotal - defesaTotal * 0.5) / 10));
   
        dano = Math.floor(dano * faker.number.float({ min: 0.8, max: 1.2 }));
        
  
        dano = Math.max(1, dano);
        
        defensor.energia = Math.max(defensor === atacante ? 0 : 5, defensor.energia - dano);
        
        console.log(`${atacante.nome} atacou ${defensor.nome} e causou ${dano} de dano!`);
        console.log(`${defensor.nome} energia: ${defensor.energia}/${this.ENERGIA_MAXIMA}`);
    }

    private obterPokemonPorId(id: number): Pokemon {
        const pokemon = this.pokemons.find(p => p.id === id);
        if (!pokemon) throw new Error("Pokémon não encontrado");
        return pokemon;
    }

    listarPokemons(): Pokemon[] {
        return [...this.pokemons];
    }

    buscarPorNome(nome: string): Pokemon[] {
        return this.pokemons.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    buscarPorTipo(tipo: string): Pokemon[] {
        return this.pokemons.filter(p => p.tipo.some(t => t.toLowerCase() === tipo.toLowerCase()));
    }

    removerPokemon(id: number): boolean {
        const index = this.pokemons.findIndex(p => p.id === id);
        if (index === -1) return false;
        this.pokemons.splice(index, 1);
        return true;
    }
}
import { createPokedex } from './pokedex-factory';

async function main() {
    const pokedex = await createPokedex();
    
    
    const pokemons = pokedex.listarPokemons();
    console.log(pokemons);
}

main().catch(console.error);