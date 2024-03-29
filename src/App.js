import React from "react";
import ReactDOM from "react-dom";
import { marked } from "marked";
import "./App.css";

// Initialize marked.js
marked.setOptions({
	breaks: true,
});

const renderMarkdown = new marked.Renderer();

const Editor = (props) => {
	return (
		<div
			id="editor-container"
			className="w-full lg:w-1/2 bg-gray-900 rounded-md p-4">
			<h3
				id="editor-heading"
				className="text-lg font-semibold bg-blue-600 rounded-t-md py-2 px-4 text-white">
				Editor
			</h3>
			<div id="editor-body" className="h-full">
				<textarea
					id="editor"
					className="w-full h-full p-4 resize-none focus:outline-none bg-gray-800 text-white rounded-b-md"
					value={props.markdown}
					onChange={props.onChange}
					placeholder="Enter Markdown..."
				/>
			</div>
		</div>
	);
};

const Preview = (props) => {
	return (
		<div
			id="preview-container"
			className="w-full lg:w-1/2 bg-gray-900 rounded-md p-4">
			<h3
				id="previewer-heading"
				className="text-lg font-semibold bg-blue-600 rounded-t-md py-2 px-4 text-white">
				Preview
			</h3>
			<div
				id="preview"
				className="p-4 overflow-auto h-full text-white"
				dangerouslySetInnerHTML={{
					__html: marked(props.markdown, { renderer: renderMarkdown }),
				}}
			/>
		</div>
	);
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markdown: placeholder,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			markdown: e.target.value,
		});
	}

	render() {
		return (
			<div id="main" className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
					REACT MARKDOWN PREVIEWER
				</h1>
				<div className="flex flex-col lg:flex-row gap-4">
					<Editor markdown={this.state.markdown} onChange={this.handleChange} />
					<Preview markdown={this.state.markdown} />
				</div>
			</div>
		);
	}
}

const placeholder = `# This is a Markdown previewer!

## Enter GitHub-style markdown 
### And receive HTML output

\`\`\`javascript
// This is a function:

function square(number) {
  return number * number;
}
\`\`\`
  
**Bold** text
_Italic_ text
**_Both!_**
~~Crossed out~~.

[Link](https://www.freecodecamp.com)
> Block Quotes!


- \`<ul></ul>\`
  - With bullets.
     - Indented.


1. \`<ol></ol>\`
1. Once started  
1. Use whatever 
- You
* Want

Embedded images:

![CodePen Logo](https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Large.png)
`;

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
