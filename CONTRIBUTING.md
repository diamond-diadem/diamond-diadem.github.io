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

That's about it

Cheers !
