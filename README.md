# typespy 🕵🏻‍♂️

Do you love typescript but hate those `any`s and `unknown`s ?

too lazy to add console logs all over the place to see runtime values?

typespy is a webserver and a babel plugin to make tracking runtime values as easy as adding a single comment.

### Installation

`npm install typespy`

### Usage

- run the typespy sever `npm run typespy`
- run the app in an emulator
- if you want to know the value of any expression like `someVariable` or `this.props`
  - add a comment line like this one where you want to check the value: `// spy someVariable`
  - in the emulator try to trigger this line
  - all the values and suggested type will be shown in the typespy server
