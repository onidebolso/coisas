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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const pokedex_1 = __importDefault(require("./pokedex")); // Note a mudança aqui (sem chaves)
class PokemonInterface {
    constructor() {
        this.rl = (0, readline_1.createInterface)({
            input: process.stdin,
            output: process.stdout
        });
        this.pokedex = new pokedex_1.default();
        this.selectedPokemon = null;
        console.log('Bem-vindo ao Sistema Pokémon!\n');
        this.mainMenu();
    }
    mainMenu() {
        console.log('\n=== MENU PRINCIPAL ===');
        console.log('1. Adicionar Pokémon');
        console.log('2. Listar Pokémons');
        console.log('3. Selecionar Pokémon');
        console.log('4. Treinar Pokémon');
        console.log('5. Descansar Pokémon');
        console.log('6. Batalhar');
        console.log('7. Sair');
        this.rl.question('Escolha uma opção: ', (answer) => {
            switch (answer) {
                case '1':
                    this.addPokemon();
                    break;
                case '2':
                    this.listPokemons();
                    break;
                case '3':
                    this.selectPokemon();
                    break;
                case '4':
                    this.trainPokemon();
                    break;
                case '5':
                    this.restPokemon();
                    break;
                case '6':
                    this.battleMenu();
                    break;
                case '7':
                    this.exit();
                    break;
                default:
                    console.log('Opção inválida!');
                    this.mainMenu();
            }
        });
    }
    addPokemon() {
        this.rl.question('Nome do Pokémon: ', (nome) => {
            this.rl.question('Tipos (separados por vírgula): ', (tiposInput) => {
                const tipos = tiposInput.split(',').map(t => t.trim());
                this.rl.question('Nível inicial: ', (nivelInput) => {
                    const nivel = parseInt(nivelInput);
                    try {
                        const pokemon = this.pokedex.adicionarPokemon(nome, tipos, nivel);
                        console.log(`\n${pokemon.nome} foi adicionado com sucesso!`);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            console.log(`\nErro: ${error.message}`);
                        }
                        else {
                            console.log('\nOcorreu um erro desconhecido ao adicionar Pokémon');
                        }
                    }
                    this.mainMenu();
                });
            });
        });
    }
    listPokemons() {
        const pokemons = this.pokedex.listarPokemons();
        if (pokemons.length === 0) {
            console.log('\nNenhum Pokémon cadastrado!');
        }
        else {
            console.log('\n=== SEUS POKÉMONS ===');
            pokemons.forEach(p => {
                const selected = this.selectedPokemon === p.id ? ' (Selecionado)' : '';
                console.log(`#${p.id} - ${p.nome} - Nível ${p.nivel} - ${p.tipo.join('/')} - Energia: ${p.energia}/100 - XP: ${p.experiencia}/${100 * p.nivel}${selected}`);
            });
        }
        this.mainMenu();
    }
    selectPokemon() {
        const pokemons = this.pokedex.listarPokemons();
        if (pokemons.length === 0) {
            console.log('\nNenhum Pokémon cadastrado para selecionar!');
            this.mainMenu();
            return;
        }
        console.log('\nSelecione um Pokémon:');
        pokemons.forEach(p => {
            console.log(`${p.id}. ${p.nome} (Nível ${p.nivel})`);
        });
        this.rl.question('Digite o número do Pokémon: ', (idInput) => {
            const id = parseInt(idInput);
            const pokemon = pokemons.find(p => p.id === id);
            if (pokemon) {
                this.selectedPokemon = id;
                console.log(`\n${pokemon.nome} selecionado com sucesso!`);
            }
            else {
                console.log('\nID inválido!');
            }
            this.mainMenu();
        });
    }
    trainPokemon() {
        if (!this.selectedPokemon) {
            console.log('\nNenhum Pokémon selecionado!');
            this.mainMenu();
            return;
        }
        this.rl.question('Quantidade de XP para ganhar: ', (xpInput) => {
            const xp = parseInt(xpInput);
            try {
                const result = this.pokedex.treinarPokemon(this.selectedPokemon, xp);
                console.log(`\n${result.pokemon.nome} ganhou ${xp} XP!`);
                if (result.subiuNivel) {
                    console.log(`Parabéns! ${result.pokemon.nome} agora é nível ${result.pokemon.nivel}!`);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(`\nErro: ${error.message}`);
                }
                else {
                    console.log('\nOcorreu um erro desconhecido ao treinar Pokémon');
                }
            }
            this.mainMenu();
        });
    }
    restPokemon() {
        if (!this.selectedPokemon) {
            console.log('\nNenhum Pokémon selecionado!');
            this.mainMenu();
            return;
        }
        this.rl.question('Horas de descanso (padrão: 8): ', (horasInput) => {
            const horas = horasInput ? parseInt(horasInput) : 8;
            try {
                const pokemon = this.pokedex.descansarPokemon(this.selectedPokemon, horas);
                console.log(`\n${pokemon.nome} descansou por ${horas} horas e recuperou energia!`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(`\nErro: ${error.message}`);
                }
                else {
                    console.log('\nOcorreu um erro desconhecido ao descansar Pokémon');
                }
            }
            this.mainMenu();
        });
    }
    battleMenu() {
        console.log('\n=== MENU DE BATALHA ===');
        console.log('1. Batalhar contra Pokémon aleatório');
        console.log('2. Batalhar contra Pokémon de nível específico');
        console.log('3. Voltar');
        this.rl.question('Escolha uma opção: ', (answer) => __awaiter(this, void 0, void 0, function* () {
            if (!this.selectedPokemon) {
                console.log('\nNenhum Pokémon selecionado para batalhar!');
                this.mainMenu();
                return;
            }
            try {
                switch (answer) {
                    case '1':
                        yield this.pokedex.iniciarBatalha(this.selectedPokemon);
                        break;
                    case '2':
                        this.rl.question('Nível do oponente: ', (nivelInput) => __awaiter(this, void 0, void 0, function* () {
                            const nivel = parseInt(nivelInput);
                            try {
                                yield this.pokedex.iniciarBatalha(this.selectedPokemon, nivel);
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.log(`\nErro na batalha: ${error.message}`);
                                }
                                else {
                                    console.log('\nOcorreu um erro desconhecido na batalha');
                                }
                            }
                            this.mainMenu();
                        }));
                        return;
                    case '3':
                        this.mainMenu();
                        return;
                    default:
                        console.log('Opção inválida!');
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(`\nErro na batalha: ${error.message}`);
                }
                else {
                    console.log('\nOcorreu um erro desconhecido na batalha');
                }
            }
            this.mainMenu();
        }));
    }
    exit() {
        console.log('\nObrigado por usar o Sistema Pokémon!');
        this.rl.close();
        process.exit(0);
    }
}
// Inicia a interface
new PokemonInterface();
