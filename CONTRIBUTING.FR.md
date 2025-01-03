
# Contribuer au site web DIAMOND

## Markdown

### Références de syntaxe

- [**Bases**](https://getdoks.org/docs/reference/markdown-basic-syntax/)
- [**Avancée**](https://getdoks.org/docs/reference/markdown-extended-syntax/)

### Support des mathématiques

Le site web prend en charge les délimiteurs `$...$` pour la syntaxe LaTeX dans les mathématiques en ligne. Pour les équations en bloc, utilisez le format suivant :

```markdown
$$
(...)
$$
```

## Intégration de vidéos YouTube (tutoriels)

Pour intégrer une vidéo YouTube, utilisez le shortcode personnalisé Diamond :

```markdown
{{< video-with-consent id="{video-id}" >}}
```

Remplacez `{video-id}` par l'identifiant YouTube de la vidéo. L'URL de la vidéo doit suivre le format : `https://www.youtube.com/watch?v={video-id}`.

### Fonctionnalités du shortcode

- Maintient un ratio d'aspect fixe (48:27) avec une largeur de 100 % pour une adaptabilité optimale.
- Active le mode renforcé de confidentialité via `youtube-no-cookie.com`.
- Intègre la gestion du consentement des cookies (si configuré dans `config/`).
- Adapte automatiquement la langue des sous-titres à celle de la page.

## Liens

Pour inclure des liens en Markdown, utilisez la syntaxe suivante :

```markdown
[Texte du lien](URL)
```

### Ouvrir des liens dans un nouvel onglet

Pour ouvrir un lien dans un nouvel onglet, utilisez la syntaxe HTML suivante :

```html
<a href="https://example.com" target="_blank">Exemple</a>
```

L'attribut `target="_blank"` garantit que le lien s'ouvre dans un nouvel onglet.

### Liens internes

Pour les liens internes au site web, incluez uniquement la partie de l'URL qui suit l'adresse principale du site.

Exemple : pour lier `https://diamond-diadem.github.io/codes/visualisation/paraview/`, utilisez :

```markdown
[ParaView](/codes/visualisation/paraview/)
```

## Images

Placez l'image que vous souhaitez ajouter(pour l'exemple, `image.png`) dans le dossier `/static/images/` du répertoire source du site.

La syntaxe Markdown de base pour intégrer une image est alors

```markdown
![alt text for the image](/images/image.png)
```

 et en HTML

 ```html
<img alt="alt text for the image" src="/images/image.png"/>   
 ```

### Adapter au mode couleur


