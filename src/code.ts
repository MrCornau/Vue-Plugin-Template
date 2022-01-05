import { createReadStream } from 'fs';
import { dispatch, handleEvent } from './codeMessageHandler';
import * as helperfunctions from "./helper/help"
import * as createFrame from "./helper/createFrame"

figma.showUI(__html__,{width: 520, height: 230});




figma.ui.onmessage = async (message) => {
	// Roboto Regular is the font that objects will be created with by default in
	// Figma. We need to wait for fonts to load before creating text using them.
	// console.log(message)
	if(message.action=="resize"){
		figma.ui.resize(520, 366)
	}

	if(message.action=="createNode"){
		
	let data = message.data
	
	let style = {
	"width": 320,
	"cardPadding": 16,
	"fontcolor_primary": { r: 0.82745, g: 0.84314, b: 0.84706 },
	"color_accent":{ r: 0.86667, g: 0.89804, b: 0.55686 },
	"color_background":{ r: 0.13725, g: 0.14510, b: 0.14902 },
	"transparent": {visible:false, type : "SOLID", color: { r: 0.82745, g: 0.84314, b: 0.84706 }},
	"color_divider":{r:0.20000, g: 0.21569, b:0.22745},
	"italicFont":{family: "IBM Plex Sans", style: "Italic"},
	"boldFont":{family: "IBM Plex Serif", style: "Bold"}
	}

	await figma.loadFontAsync(style.boldFont);
	await figma.loadFontAsync(style.italicFont);




	let CommentGrid = figma.createFrame()

	CommentGrid.layoutMode = "HORIZONTAL";
	// @ts-ignore
    CommentGrid.itemSpacing =64;
	// @ts-ignore
    CommentGrid.primaryAxisSizingMode = "AUTO";
    CommentGrid.counterAxisSizingMode = "AUTO";
		// @ts-ignore
    CommentGrid.fills = [style.transparent]

	const counts = {};
	for (const num of data) {
		counts[num.tag] = counts[num.tag] ? counts[num.tag] + 1 : 1;
	  }

	console.log(Object.keys(counts))
	let SortedComments = []
	for (const tag of Object.keys(counts)) {
		let tagObj={ "tag": tag,
					"comments":[]}
		for (const comment of data) {
			if(comment.tag == tag){
					tagObj.comments.push(comment)
				}
			}
		SortedComments.push(tagObj)
	}
	console.log(SortedComments)

	for (let row of SortedComments){

		let Row_F = figma.createFrame()

		Row_F.layoutMode = "VERTICAL";
		// @ts-ignore
		Row_F.itemSpacing = 36;
		// @ts-ignore
		Row_F.primaryAxisSizingMode = "AUTO";
		Row_F.counterAxisSizingMode = "AUTO";
			// @ts-ignore
		Row_F.fills = [style.transparent]

		//Heading
		let TagName = figma.createText();
		Row_F.appendChild(TagName);
		TagName.fontName = style.boldFont;
		TagName.fontSize = 36
		TagName.fills = [{type : "SOLID", color: style.color_background}]
		if(row.tag.length === 0){
			TagName.characters = 'No Tag';
		}else(TagName.characters = row.tag)

		TagName.textAutoResize = "HEIGHT";
		TagName.layoutAlign = "STRETCH";
		for (let comment of row.comments){
			let content = {
				"metaTag": comment.imagehash,"autor":comment.autor,"date":comment.date,"sent":comment.MarkedSent,"link":comment.link,"heading":comment.heading,"description":comment.description,"rating":comment.rating,"tag":comment.tag
			} 
			let Frame = await createFrame.createFrame(content,style)
			Row_F.appendChild(Frame)
		}
		CommentGrid.appendChild(Row_F)
		
	}
	let viewport = []
	viewport.push(CommentGrid)
	figma.viewport.scrollAndZoomIntoView(viewport);
	figma.closePlugin()
}
  }



