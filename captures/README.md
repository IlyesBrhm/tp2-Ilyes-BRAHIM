# Captures — preuves du diagnostic

La machine de travail n'a pas d'environnement graphique exploitable pour des captures
d'écran. Les preuves sont donc des **sorties terminal brutes**, enregistrées telles
quelles, plus les traces de session OpenCode. Chaque fichier correspond à une commande
lancée pendant le TP.

| Fichier | Ce qu'il prouve |
|---|---|
| `avant/git-status.txt` | état du dépôt après le run « avant » de la chaîne |
| `avant/diff-avant.patch` | code produit par la chaîne « avant » |
| `avant/availability.ts`, `avant/*.spec.ts` | fichiers créés par la chaîne « avant » |
| `avant/chain-errors.log` | `ProviderModelNotFoundError` : les subagents échouaient tous |
| `avant/tests-hidden-failures.txt` | bugs révélés en renommant les tests cachés (409 vs 201, `'5020'` vs 70) |
| `02-tests-corriges.txt` | suite verte après correction des tests et des bugs |
| `03-lint-actif.txt` | le lint attrape enfin une erreur (avant : `rules: {}`) |
| `04-hook-precommit.txt` | le pre-commit husky s'exécute réellement à chaque commit |
| `05-commit-harness.txt` | commit du harness réparé (hook vert) |
| `06-apres-chain.txt` | run « après » : délégation finder/explorer/planner/dev/reviewer/tester |
| `07-apres-tests.txt` | 38 tests verts après le run « après » |
| `08-commit-feature.txt` | commit de la fonctionnalité produite par la chaîne |

Le raisonnement complet est dans `DIAGNOSTIC.md` à la racine du dépôt.
