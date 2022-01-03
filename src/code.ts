import { dispatch, handleEvent } from './codeMessageHandler';

const arrow = `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.47534 7.28992L11.3305 10.145L8.67225 12.8033" stroke="#DDE58E"/>
<path d="M1 0.810425V10.0465H10.6343" stroke="#DDE58E"/></svg>`

figma.showUI(__html__);

let backgroundcolor = {r:35,b:37,g:38}
let fontcolor_primary = { r: 0.82745, g: 0.84314, b: 0.84706 }
let color_accent = { r: 0.86667, g: 0.89804, b: 0.55686 }
let color_background = { r: 0.13725, g: 0.14510, b: 0.14902 }
let transparent = {visible:false, type : "SOLID", color: fontcolor_primary}



figma.ui.onmessage = async (message) => {
	// Roboto Regular is the font that objects will be created with by default in
	// Figma. We need to wait for fonts to load before creating text using them.
	///console.log(message)

	let data = message.data
	let autor = message.data[0].autor
	let date = message.data[0].date
	let sent = message.data[0].MarkedSent
	let link = message.data[0].link



	// var needle = '---->'
	// var re = new RegExp(needle,'gi');
	// var haystack = sent;
	
	// var results = new Array();//this is the results you want
	// while (re.exec(haystack)){
	//   results.push(re.lastIndex);
	// }

	// console.log(results)
	//console.log(autor,'Autor')
	await figma.loadFontAsync({ family: "IBM Plex Serif", style: "Regular" })

    let boldFont = {family: "IBM Plex Serif", style: "Bold"};
    await figma.loadFontAsync(boldFont);
	let italicFont = {family: "IBM Plex Sans", style: "Italic"};
	await figma.loadFontAsync(italicFont);
	// let numbers = message.data
	
	const frameWidth = 480
	const frameHeight = 600
    const imageWidth = 320;
    const cardPadding = 16;
    // Create Metacard Frame
    let cardFrame = figma.createFrame();
	// @ts-ignore
    cardFrame.cornerRadius = 0;
	cardFrame.resize(imageWidth + cardPadding*2,imageWidth);
    cardFrame.layoutMode = "VERTICAL";
	// @ts-ignore
    cardFrame.paddingLeft = cardFrame.paddingRight = cardFrame.paddingTop = cardFrame.paddingBottom = cardPadding;
    cardFrame.itemSpacing = cardPadding/2;
	// @ts-ignore
    cardFrame.primaryAxisSizingMode = "AUTO";
    cardFrame.counterAxisSizingMode = "FIXED";
    cardFrame.fills = [{type : "SOLID", color: color_background}];
    // cardFrame.strokes = [{type : "SOLID", color: { r: 0, g: 0, b: 0 }}];
    cardFrame.strokeWeight = 2;
	
	// const newNode = figma.createNodeFromSvg(arrow);
	// header container

	let header = figma.createFrame();
	cardFrame.appendChild(header);
	header.layoutMode = "HORIZONTAL";
	// @ts-ignore
	header.primaryAxisSizingMode = "FIXED";
	header.counterAxisSizingMode = "AUTO";
	// @ts-ignore
	header.primaryAxisAlignItems = "SPACE_BETWEEN";
	header.layoutAlign= "STRETCH";
	// @ts-ignore
	header.fills = [transparent]

	//heading
	let heading = figma.createFrame();
	header.appendChild(heading);
	heading.layoutMode = "VERTICAL";
	heading.counterAxisSizingMode = "AUTO";
	// @ts-ignore
	heading.fills = [transparent]
	
	//title
	let Title = figma.createText();
	heading.appendChild(Title);
    Title.fontName = boldFont;
	Title.fills = [{type : "SOLID", color: fontcolor_primary}]
    Title.characters = autor;
    Title.textAutoResize = "HEIGHT";
    Title.layoutAlign = "STRETCH";
	
	//date
	let date_T = figma.createText();
	heading.appendChild(date_T);
    date_T.fontName = italicFont;
	date_T.fills = [{type : "SOLID", color: color_accent}]
    date_T.characters = date;
    date_T.textAutoResize = "WIDTH_AND_HEIGHT";
    date_T.layoutAlign = "STRETCH";

	// Tag
	let tag = figma.createFrame();
	header.appendChild(tag);
	tag.layoutMode = "VERTICAL";
	tag.itemSpacing = 1;
	tag.counterAxisSizingMode = "AUTO";
	// @ts-ignore
	tag.primaryAxisSizingMode = "AUTO";
	tag.fills = [{opacity:0.25, type : "SOLID", color: color_accent}]

	let tag_T = figma.createText();
	tag.appendChild(tag_T);
    tag_T.fontName = italicFont;
	tag_T.fills = [{type : "SOLID", color: color_accent}]
    tag_T.characters = '#comunication';
    tag_T.textAutoResize = "WIDTH_AND_HEIGHT";
    tag_T.layoutAlign = "STRETCH";
	

	// description
	let description_T = figma.createText();
	cardFrame.appendChild(description_T);
	description_T.fontName = italicFont;
	description_T.fills = [{type : "SOLID", color: fontcolor_primary}]
    description_T.characters = sent;
	description_T.setRangeFills(0,5,[{type : "SOLID", color: color_accent}])
    description_T.textAutoResize = "WIDTH_AND_HEIGHT";
    description_T.layoutAlign = "STRETCH";

	console.log(description_T.fills)
	// link





	// Tag
	let link_F = figma.createFrame();
	cardFrame.appendChild(link_F);
	link_F.layoutMode = "HORIZONTAL";
	link_F.itemSpacing = 4;
	link_F.counterAxisSizingMode = "AUTO";
	// @ts-ignore
	link_F.primaryAxisSizingMode = "AUTO";
	// @ts-ignore
	link_F.fills =  [transparent]

	const Arrow = figma.createNodeFromSvg(arrow);
	link_F.appendChild(Arrow);

	let Link_T = figma.createText();
	link_F.appendChild(Link_T);
    Link_T.fontName = italicFont;
	Link_T.fills = [{type : "SOLID", color: color_accent}]
    Link_T.characters = 'visit comment';
    Link_T.textAutoResize = "WIDTH_AND_HEIGHT";
    Link_T.layoutAlign = "STRETCH";
	// @ts-ignore
	Link_T.hyperlink = {
		type: "URL",
		value: link
	  };


	// let metaDesc = figma.createText();
    // await figma.loadFontAsync({family: "Inter", style: "Medium"});
    // cardFrame.appendChild(metaDesc);
    // metaDesc.characters = sent;
    // metaDesc.textAutoResize = "HEIGHT";
    // metaDesc.layoutAlign = "STRETCH";
	
    // metaTitle.hyperlink = {
    //   type: "URL",
    //   value: metaTags.hyperlink
    // };


	// const chartX = 25
	// const chartY = 50
	// const chartWidth = frameWidth - 50
	// const chartHeight = frameHeight - 50
	// frame.resizeWithoutConstraints(frameWidth, frameHeight) //Size of frame
  
	// // Center the frame in our current viewport so we can see it.
	// frame.x = figma.viewport.center.x - frameWidth / 2
	// frame.y = figma.viewport.center.y - frameHeight / 2
  
	// // Border for the chart
	// const border = figma.createRectangle()
	// frame.appendChild(border)
	// border.resizeWithoutConstraints(frameWidth, frameHeight)
	// border.strokeAlign = 'INSIDE'
	// border.strokeWeight = 3
	// border.fills = []
	// border.strokes = [{ type: 'SOLID', color: {r: 0, g: 0, b: 0} }]
	// border.constraints = {horizontal: 'STRETCH', vertical: 'STRETCH'}
  
	// // Line at the bottom of the chartx^x
	// const line = figma.createRectangle()
	// frame.appendChild(line)
	// line.x = chartX
	// line.y = chartY + chartHeight
	// line.resizeWithoutConstraints(chartWidth, 3)
	// line.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 0} }]
	// line.constraints = {horizontal: 'STRETCH', vertical: 'STRETCH'}
  
	// const min = numbers.reduce((a, b) => Math.min(a, b), 0)
	// const max = numbers.reduce((a, b) => Math.max(a, b), 0)
  
	// for (let i = 0; i < numbers.length; i++) {
	//   const num = numbers[i];
	//   const left = chartX + chartWidth * (i + 0.25) / numbers.length;
	//   const right = chartX + chartWidth * (i + 0.75) / numbers.length;
	//   const top = chartY + chartHeight - chartHeight * (Math.max(0, num) - min) / (max - min);
	//   const bottom = chartY + chartHeight - chartHeight * (Math.min(0, num) - min) / (max - min);
  
	//   // The column
	//   const column = figma.createRectangle()
	//   frame.appendChild(column)
	//   column.x = left
	//   column.y = top
	//   column.resizeWithoutConstraints(right - left, bottom - top)
	//   column.fills = [{ type: 'SOLID', color: {r: 1, g: 0, b: 0} }]
	//   column.constraints = {horizontal: 'STRETCH', vertical: 'STRETCH'}
  
	//   // The label
	//   const label = figma.createText()
	//   frame.appendChild(label)
	//   label.x = left - 50
	//   label.y = top - 50
	//   label.resizeWithoutConstraints(right - left + 100, 50)
	//   label.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 0} }]
	//   label.characters = num.toString()
	//   label.fontSize = 30
	//   label.textAlignHorizontal = 'CENTER'
	//   label.textAlignVertical = 'BOTTOM'
	//   label.constraints = {horizontal: 'STRETCH', vertical: 'STRETCH'}
	// }
  
	figma.closePlugin()
  }