# Contributing to the DIAMOND website
## This file is intented to be read in its source form
## Contributing to the documentation
### A few rules
#### Write a markdown file
##### Code

- inline: `snippet of code` between 2 backticks ``
- block: between 3 backticks ``` before and after
  - but please precise language, for example "```python "

  ```python
  import numpy as np
  a = np.ones((100, 100))
  ```

  - in case of command lines for  a terminal, precise " ```bash "
  for on the website, the code block takes the form of a console

  ```bash
  sudo apt update
  sudo apt upgrade
  ```

##### Math
The website is now set up to accept "$ $" as delimiters for LaTeX syntax for inline math.
For equation as a block : use " $$ $$ " delimiters

##### Links
For links to another website, obviously put the url of the page you want.

Only one thing, if you want the linked page to open in another tab and not to replace the actual code, use html instead of markdown (but in the markdown file)

<a href="https://example.com" target="_blank">Example</a>

the 'target="_blank"' option allows to open the link in a new tab

For a ref to another page of the website, the adress to write down is the part in the adress bar which is after the website adress.

For example, to link to https://diamond-diadem.github.io/en/codes/visualisation/paraview/,

write [ParaView](/en/codes/visualisation/paraview/)

##### Videos

To embed a video from youtube (video tutorials by Dylan: Diamond-DIADEM youtube channel) :

1. go to the video webpage on Youtube
2. below the video on the right, click on the "Share" button
3. among the different options, clic the "Embed < >" button
4. click "Copy" at the bottom right of the pop-up window that just opened
5. paste this html bit: `<iframe ...></iframe>` in the content file where you want to embed your video.
6. Replace the bit `width="560" height="315"` by `class="tuto-video"`: this is important for the video size to adapt to various screen sizes
7. in order to make the correct language for the subtitles to appear when opening the video, add the following string at the end of the one after `src=`: `"&cc_lang_pref=fr&cc_load_policy=1"` for french subtitles and `"&cc_lang_pref=en&cc_load_policy=1"` for english subtitles
8. you get something similar to the following result, and this is good to go:

```html
<iframe class="tuto-video" src="https://www.youtube.com/embed/OuMyAWsiDDY?si=wGEheMjehqcB8-X8&cc_lang_pref=fr&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```

##### That's about it
