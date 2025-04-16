import { PokedexWithPersistence } from './pokedex-persistence';
import * as readline from 'readline';
import { Pokemon } from './pokedex';

class PokedexUI {
    private pokedex: PokedexWithPersistence;
    private rl: readline.Interface;

    constructor() {
        this.pokedex = new PokedexWithPersistence();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public async start(): Promise<void> {
        await this.pokedex.initialize();
        this.showMainMenu();
    }

    private showMainMenu(): void {
        console.log('\n=== MENU PRINCIPAL POKEDEX ===');
        console.log('1. Listar Pokémon');
        console.log('2. Adicionar Pokémon');
        console.log('3. Remover Pokémon');
        console.log('4. Treinar Pokémon');
        console.log('5. Descansar Pokémon');
        console.log('6. Batalhar');
        console.log('7. Salvar manualmente');
        console.log('8. Sair');

        this.rl.question('Escolha uma opção: ', async (answer) => {
            switch (answer) {
                case '1':
                    await this.listPokemons();
                    break;
                case '2':
                    await this.addPokemon();
                    break;
                case '3':
                    await this.removePokemon();
                    break;
                case '4':
                    await this.trainPokemon();
                    break;
                case '5':
                    await this.restPokemon();
                    break;
                case '6':
                    await this.battlePokemon();
                    break;
                case '7':
                    await this.manualSave();
                    break;
                case '8':
                    this.exit();
                    return;
                default:
                    console.log('Opção inválida!');
                    this.showMainMenu();
            }
        });
    }

    private async listPokemons(): Promise<void> {
        const pokemons = this.pokedex.listarPokemons();
        
        if (pokemons.length === 0) {
            console.log('\nNenhum Pokémon cadastrado!');
        } else {
            console.log('\n=== LISTA DE POKÉMONS ===');
            pokemons.forEach(p => {
                console.log(`#${p.id} ${p.nome} - Nível ${p.nivel} (${p.tipo.join('/')})`);
                console.log(`   Ataque: ${p.ataque} | Defesa: ${p.defesa} | Energia: ${p.energia}/100`);
                console.log(`   XP: ${p.experiencia}/${p.nivel * 100} | Cadastrado em: ${p.dataCadastro.toLocaleDateString()}`);
                if (p.ultimoTreino) {
                    console.log(`   Último treino: ${p.ultimoTreino.toLocaleDateString()}`);
                }
            });
        }
        
        this.showMainMenu();
    }

    private async addPokemon(): Promise<void> {
        this.rl.question('Nome do Pokémon: ', async (nome) => {
            this.rl.question('Tipos (separados por vírgula): ', async (tiposInput) => {
                const tipos = tiposInput.split(',').map(t => t.trim());
                this.rl.question('Nível: ', async (nivelStr) => {
                    const nivel = parseInt(nivelStr);
                    
                    try {
                        const pokemon = this.pokedex.adicionarPokemon(nome, tipos, nivel);
                        console.log(`\n${pokemon.nome} foi adicionado com sucesso!`);
                        await this.pokedex.saveToFile();
                    } catch (error) {
                        console.error(`\nErro: ${(error as Error).message}`);
                    }
                    
                    this.showMainMenu();
                });
            });
        });
    }

    private async removePokemon(): Promise<void> {
        const pokemons = this.pokedex.listarPokemons();
        if (pokemons.length === 0) {
            console.log('\nNenhum Pokémon para remover!');
            this.showMainMenu();
            return;
        }

        console.log('\n=== REMOVER POKÉMON ===');
        pokemons.forEach(p => {
            console.log(`#${p.id} - ${p.nome} (Nível ${p.nivel})`);
        });

        this.rl.question('ID do Pokémon a remover (ou 0 para cancelar): ', async (idStr) => {
            const id = parseInt(idStr);
            
            if (id === 0) {
                this.showMainMenu();
                return;
            }

            const success = this.pokedex.removerPokemon(id);
            if (success) {
                console.log('\nPokémon removido com sucesso!');
                await this.pokedex.saveToFile();
            } else {
                console.log('\nID inválido!');
            }
            
            this.showMainMenu();
        });
    }

    private async trainPokemon(): Promise<void> {
        const pokemons = this.pokedex.listarPokemons();
        if (pokemons.length === 0) {
            console.log('\nNenhum Pokémon para treinar!');
            this.showMainMenu();
            return;
        }

        console.log('\n=== TREINAR POKÉMON ===');
        pokemons.forEach(p => {
            console.log(`#${p.id} - ${p.nome} (Energia: ${p.energia}/100)`);
        });

        this.rl.question('ID do Pokémon a treinar: ', async (idStr) => {
            const id = parseInt(idStr);
            this.rl.question('XP ganho no treino: ', async (xpStr) => {
                const xp = parseInt(xpStr);
                
                try {
                    const result = this.pokedex.treinarPokemon(id, xp);
                    console.log(`\n${result.pokemon.nome} treinou e ganhou ${xp} XP!`);
                    if (result.subiuNivel) {
                        console.log(`Parabéns! ${result.pokemon.nome} subiu para o nível ${result.pokemon.nivel}!`);
                    }
                    await this.pokedex.saveToFile();
                } catch (error) {
                    console.error(`\nErro: ${(error as Error).message}`);
                }
                
                this.showMainMenu();
            });
        });
    }

    private async restPokemon(): Promise<void> {
        const pokemons = this.pokedex.listarPokemons();
        if (pokemons.length === 0) {
            console.log('\nNenhum Pokémon para descansar!');
            this.showMainMenu();
            return;
        }

        console.log('\n=== DESCANSO POKÉMON ===');
        pokemons.forEach(p => {
            console.log(`#${p.id} - ${p.nome} (Energia: ${p.energia}/100)`);
        });

        this.rl.question('ID do Pokémon que vai descansar: ', async (idStr) => {
            const id = parseInt(idStr);
            this.rl.question('Horas de descanso (padrão: 8): ', async (horasStr) => {
                const horas = horasStr ? parseInt(horasStr) : 8;
                
                try {
                    const pokemon = this.pokedex.descansarPokemon(id, horas);
                    console.log(`\n${pokemon.nome} descansou por ${horas} horas e recuperou energia!`);
                    console.log(`Energia atual: ${pokemon.energia}/100`);
                    await this.pokedex.saveToFile();
                } catch (error) {
                    console.error(`\nErro: ${(error as Error).message}`);
                }
                
                this.showMainMenu();
            });
        });
    }

    private async battlePokemon(): Promise<void> {
        const pokemons = this.pokedex.listarPokemons();
        if (pokemons.length === 0) {
            console.log('\nNenhum Pokémon para batalhar!');
            this.showMainMenu();
            return;
        }

        console.log('\n=== BATALHA POKÉMON ===');
        pokemons.forEach(p => {
            console.log(`#${p.id} - ${p.nome} (Nível ${p.nivel}, Energia: ${p.energia}/100)`);
        });

        this.rl.question('ID do seu Pokémon para batalha: ', async (idStr) => {
            const id = parseInt(idStr);
            this.rl.question('Nível do oponente (deixe em branco para aleatório): ', async (nivelStr) => {
                const nivel = nivelStr ? parseInt(nivelStr) : undefined;
                
                try {
                    console.log('\nIniciando batalha...');
                    const { vencedor, perdedor, xpGanho } = await this.pokedex.iniciarBatalha(id, nivel);
                    
                    console.log(`\n=== RESULTADO DA BATALHA ===`);
                    console.log(`Vencedor: ${vencedor.nome} (Nível ${vencedor.nivel})`);
                    console.log(`Perdedor: ${perdedor.nome} (Nível ${perdedor.nivel})`);
                    
                    if (vencedor.id === id) {
                        console.log(`Seu Pokémon ganhou ${xpGanho} XP!`);
                    }
                    
                    await this.pokedex.saveToFile();
                } catch (error) {
                    console.error(`\nErro: ${(error as Error).message}`);
                }
                
                this.showMainMenu();
            });
        });
    }

    private async manualSave(): Promise<void> {
        try {
            await this.pokedex.saveToFile();
            console.log('\nDados salvos com sucesso!');
        } catch (error) {
            console.error('\nErro ao salvar:', error);
        }
        this.showMainMenu();
    }

    private exit(): void {
        console.log('\nSaindo da Pokédex...');
        this.rl.close();
        process.exit(0);
    }
}

const ui = new PokedexUI();
ui.start().catch(console.error);