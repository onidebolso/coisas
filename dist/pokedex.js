"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
// Classe para gerenciar a Pokédex
class Pokedex {
    constructor() {
        this.EXPERIENCIA_POR_NIVEL = 100;
        this.ENERGIA_MAXIMA = 100;
        this.ENERGIA_POR_TREINO = 10;
        this.ENERGIA_POR_DESCANSO = 30;
        this.BONUS_DESCANSO = 1.2;
        this.XP_VITORIA = 2;
        this.XP_DERROTA = 0.1;
        this.pokemons = [];
        this.proximoId = 1;
    }
    // Adiciona um novo Pokémon
    adicionarPokemon(nome, tipos, nivel) {
        if (nivel <= 0) {
            throw new Error("Nível deve ser maior que zero");
        }
        if (tipos.length === 0) {
            throw new Error("Pokémon deve ter pelo menos um tipo");
        }
        const novoPokemon = {
            id: this.proximoId++,
            nome,
            tipo: tipos,
            nivel,
            experiencia: 0,
            energia: this.ENERGIA_MAXIMA,
            ataque: 50 + Math.floor(Math.random() * 20), // Ataque base aleatório
            defesa: 50 + Math.floor(Math.random() * 20), // Defesa base aleatória
            dataCadastro: new Date(),
            emBatalha: false
        };
        this.pokemons.push(novoPokemon);
        return novoPokemon;
    }
    // Gera um Pokémon aleatório para batalha
    gerarPokemonAleatorio(nivel) {
        const tipos = ['Fogo', 'Água', 'Planta', 'Elétrico', 'Psíquico', 'Voador', 'Venenoso', 'Pedra'];
        const tipo1 = faker_1.faker.helpers.arrayElement(tipos);
        let tipo2 = faker_1.faker.helpers.arrayElement([...tipos, undefined]);
        // Garante que tipo2 seja diferente de tipo1 se existir
        if (tipo2 === tipo1) {
            tipo2 = undefined;
        }
        const tiposPokemon = tipo2 ? [tipo1, tipo2] : [tipo1];
        const nivelAleatorio = nivel || faker_1.faker.number.int({ min: 1, max: 50 });
        return {
            id: this.proximoId++,
            nome: faker_1.faker.person.firstName(),
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
    // Treinar um Pokémon
    treinarPokemon(id, experienciaGanha) {
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
        // Bônus se tiver descansado recentemente
        if (pokemon.ultimoDescanso &&
            new Date().getTime() - pokemon.ultimoDescanso.getTime() < 24 * 60 * 60 * 1000) {
            experienciaEfetiva = Math.floor(experienciaGanha * this.BONUS_DESCANSO);
            console.log(`${pokemon.nome} está descansado e ganha 20% mais XP!`);
        }
        pokemon.experiencia += experienciaEfetiva;
        pokemon.energia -= this.ENERGIA_POR_TREINO;
        pokemon.ultimoTreino = new Date();
        // Verifica se subiu de nível
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
    // Descansar um Pokémon
    descansarPokemon(id, horas = 8) {
        const pokemon = this.obterPokemonPorId(id);
        if (pokemon.emBatalha) {
            throw new Error(`${pokemon.nome} está em batalha e não pode descansar agora!`);
        }
        if (horas <= 0) {
            throw new Error("Tempo de descanso deve ser maior que zero");
        }
        // Calcula energia recuperada
        const energiaRecuperada = Math.min(this.ENERGIA_POR_DESCANSO * horas, this.ENERGIA_MAXIMA - pokemon.energia);
        pokemon.energia += energiaRecuperada;
        pokemon.ultimoDescanso = new Date();
        console.log(`${pokemon.nome} descansou por ${horas} horas e recuperou ${energiaRecuperada} de energia.`);
        console.log(`Energia atual: ${pokemon.energia}/${this.ENERGIA_MAXIMA}`);
        return pokemon;
    }
    // Iniciar uma batalha
    iniciarBatalha(idPokemonHeroi, nivelOponente) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let atacante;
            let defensor;
            // Batalha continua até um dos Pokémons ser derrotado
            while (heroi.energia >= 5 && oponente.energia > 0) {
                console.log(`\n--- Turno ${turno} ---`);
                // Rola o dado para ver quem ataca (1-100)
                const dado = faker_1.faker.number.int({ min: 1, max: 100 });
                if (dado <= 50) {
                    atacante = heroi;
                    defensor = oponente;
                    console.log(`${heroi.nome} ataca primeiro neste turno!`);
                }
                else {
                    atacante = oponente;
                    defensor = heroi;
                    console.log(`${oponente.nome} ataca primeiro neste turno!`);
                }
                // Realiza o ataque
                yield this.realizarAtaque(atacante, defensor);
                // Verifica se a batalha terminou
                if (defensor.energia <= (defensor === heroi ? 5 : 0)) {
                    break;
                }
                // Troca de atacante/defensor para o contra-ataque
                [atacante, defensor] = [defensor, atacante];
                // Realiza o contra-ataque se o defensor ainda tiver energia
                if (defensor.energia > (defensor === heroi ? 5 : 0)) {
                    yield this.realizarAtaque(atacante, defensor);
                }
                turno++;
                yield new Promise(resolve => setTimeout(resolve, 1000)); // Pausa entre turnos
            }
            // Determina o vencedor
            let vencedor, perdedor, xpGanho = 0;
            if (heroi.energia < 5) {
                heroi.energia = 1; // Ajusta energia para 1 se for derrotado
                vencedor = oponente;
                perdedor = heroi;
                // Perda de XP por derrota
                const xpPerdido = Math.floor(perdedor.experiencia * this.XP_DERROTA);
                perdedor.experiencia = Math.max(0, perdedor.experiencia - xpPerdido);
                console.log(`\n${heroi.nome} foi derrotado e perdeu ${xpPerdido} XP!`);
            }
            else {
                oponente.energia = 0;
                vencedor = heroi;
                perdedor = oponente;
                // Ganho de XP por vitória
                xpGanho = perdedor.nivel * this.XP_VITORIA;
                vencedor.experiencia += xpGanho;
                console.log(`\n${heroi.nome} venceu a batalha e ganhou ${xpGanho} XP!`);
                // Verifica se subiu de nível
                if (vencedor.experiencia >= this.EXPERIENCIA_POR_NIVEL * vencedor.nivel) {
                    const resultado = this.treinarPokemon(vencedor.id, 0); // Força verificação de nível
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
        });
    }
    // Realiza um ataque entre Pokémons
    realizarAtaque(atacante, defensor) {
        return __awaiter(this, void 0, void 0, function* () {
            // Calcula dano com multiplicador de nível
            const ataqueTotal = atacante.ataque * atacante.nivel;
            const defesaTotal = defensor.defesa * defensor.nivel;
            let dano = Math.max(1, Math.floor((ataqueTotal - defesaTotal * 0.5) / 10));
            // Adiciona variação aleatória ao dano (80-120%)
            dano = Math.floor(dano * faker_1.faker.number.float({ min: 0.8, max: 1.2 }));
            // Garante que o dano seja pelo menos 1
            dano = Math.max(1, dano);
            defensor.energia = Math.max(defensor === atacante ? 0 : 5, defensor.energia - dano);
            console.log(`${atacante.nome} atacou ${defensor.nome} e causou ${dano} de dano!`);
            console.log(`${defensor.nome} energia: ${defensor.energia}/${this.ENERGIA_MAXIMA}`);
        });
    }
    // Métodos auxiliares
    obterPokemonPorId(id) {
        const pokemon = this.pokemons.find(p => p.id === id);
        if (!pokemon)
            throw new Error("Pokémon não encontrado");
        return pokemon;
    }
    listarPokemons() {
        return [...this.pokemons];
    }
    buscarPorNome(nome) {
        return this.pokemons.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    buscarPorTipo(tipo) {
        return this.pokemons.filter(p => p.tipo.some(t => t.toLowerCase() === tipo.toLowerCase()));
    }
    removerPokemon(id) {
        const index = this.pokemons.findIndex(p => p.id === id);
        if (index === -1)
            return false;
        this.pokemons.splice(index, 1);
        return true;
    }
}
exports.default = Pokedex;
// Exemplo de uso
(() => __awaiter(void 0, void 0, void 0, function* () {
    const pokedex = new Pokedex();
    try {
        // Adiciona alguns Pokémons
        const pikachu = pokedex.adicionarPokemon("Pikachu", ["Elétrico"], 5);
        const charizard = pokedex.adicionarPokemon("Charizard", ["Fogo", "Voador"], 15);
        console.log("Pokémons iniciais:");
        console.log(pokedex.listarPokemons());
        // Treina um pouco
        pokedex.treinarPokemon(pikachu.id, 50);
        pokedex.descansarPokemon(pikachu.id, 8);
        // Inicia uma batalha
        console.log("\nIniciando batalha...");
        yield pokedex.iniciarBatalha(pikachu.id);
        // Batalha contra oponente mais forte
        console.log("\nDesafiando oponente mais forte...");
        yield pokedex.iniciarBatalha(pikachu.id, 10);
        // Batalha com Charizard
        console.log("\nCharizard entra na batalha!");
        pokedex.descansarPokemon(charizard.id, 12); // Descanso longo
        yield pokedex.iniciarBatalha(charizard.id, 20);
        console.log("\nStatus final dos Pokémons:");
        console.log(pokedex.listarPokemons());
    }
    catch (error) {
        console.error("Erro:", error);
    }
}))();
