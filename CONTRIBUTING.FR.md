
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

Remplacez `{video-id}` par l'identifiant YouTube de la vidéo. Pour l'obtenir, sur la page de la vidéo YouTube, cliquez sur le bouton "Partager" et copiez le lien de type `https://youtu.be/{video-id}`.

### Fonctionnalités du shortcode

- Maintient un ratio d'aspect fixe (48:27) avec une largeur de 100 % pour une adaptabilité optimale.
- Active le mode renforcé de confidentialité via `youtube-no-cookie.com`.
- Intègre la gestion du consentement des cookies (si configurée dans `config/`).
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

Placez l'image que vous souhaitez ajouter (par exemple, `image.png`) dans le dossier `static/images/` du répertoire source du site.

La syntaxe Markdown de base pour intégrer une image est :

```markdown
![Description alternative de l'image](/images/image.png)
```

En HTML, utilisez :

```html
<img alt="Description alternative de l'image" src="/images/image.png"/>   
```

### Adapter les images aux thèmes clair/sombre

Si une image doit être adaptée pour les thèmes clair et sombre, créez deux fichiers : `image-light.png` et `image-dark.png` dans `static/images`.

Ensuite, utilisez :

```html
<img alt="Description alternative de l'image" class="custom-image">
```

Ajoutez ce code dans `assets/scss/_custom.scss` :

```scss
.custom-image {
    content: url(/images/image-light.png);
}
@include color-mode(dark) {
    .custom-image {
        content: url(/images/image-dark.png);
    }
}
```

Ainsi, l'image s'adapte automatiquement au thème choisi par l'utilisateur.
