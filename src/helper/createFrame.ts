import * as helperfunctions from "./help"


export async function createFrame (content, style){

	let metaTags = content.metaTag
	let autor = content.autor
	let date = content.date
	let sent = content.sent
	let link = content.link
	let heading = content.heading
	let description = content.description
	let rating = content.rating
	let tag = content.tag

    let color_divider = style.color_divider
    let transparent = style.transparent
    let color_background = style.color_background
    let color_accent = style.color_accent
    let fontcolor_primary = style.fontcolor_primary
	let imageWidth = style.width
	let cardPadding = style.cardPadding
	let italicFont = style.italicFont
	let boldFont = style.boldFont



	let markedSent = helperfunctions.getMarkedPartsOfSent('-----> ',' !!!',sent)
    // Create Metacard Frame
    let cardFrame = figma.createFrame();
	// @ts-ignore
    cardFrame.cornerRadius = 0;
	cardFrame.resize(imageWidth + cardPadding*2,imageWidth);

    cardFrame.layoutMode = "VERTICAL";
	// @ts-ignore
    cardFrame.paddingTop = cardFrame.paddingBottom = cardPadding;
    cardFrame.itemSpacing = cardPadding/2;
	// @ts-ignore
    cardFrame.primaryAxisSizingMode = "AUTO";
    cardFrame.counterAxisSizingMode = "FIXED";
    cardFrame.fills = [{type : "SOLID", color: color_background}];
    // cardFrame.strokes = [{type : "SOLID", color: { r: 0, g: 0, b: 0 }}];
    cardFrame.strokeWeight = 2;
	
	// const newNode = figma.createNodeFromSvg(arrow);
	// header container


	let description_F = figma.createFrame();
	cardFrame.appendChild(description_F);
	description_F.paddingLeft = description_F.paddingRight = cardPadding
	description_F.itemSpacing = cardPadding/2;
	description_F.layoutMode = "VERTICAL";
	description_F.primaryAxisSizingMode = "AUTO";
    description_F.counterAxisSizingMode = "AUTO";
	description_F.layoutAlign= "STRETCH";

	// @ts-ignore
	description_F.fills = [transparent]


	// Tag
	let tag_F = figma.createFrame();
	description_F.appendChild(tag_F);
	tag_F.layoutMode = "VERTICAL";
	tag_F.itemSpacing = 1;
	tag_F.counterAxisSizingMode = "AUTO";
	// @ts-ignore
	tag_F.primaryAxisSizingMode = "AUTO";
	tag_F.fills = [{opacity:0.25, type : "SOLID", color: color_accent}]

	let tag_T = figma.createText();
	tag_F.appendChild(tag_T);
    tag_T.fontName = italicFont;
	tag_T.fills = [{type : "SOLID", color: color_accent}]
	if(tag.length === 0){
		tag_T.characters = '#placeholder';
		tag_F.visible = false;
	}else(tag_T.characters = '#'+tag)
    tag_T.textAutoResize = "WIDTH_AND_HEIGHT";
    tag_T.layoutAlign = "STRETCH";

	console.log(tag.length)


	//Heading
	let heading_T = figma.createText();
	description_F.appendChild(heading_T);
    heading_T.fontName = boldFont;
	heading_T.fills = [{type : "SOLID", color: fontcolor_primary}]
	if(heading.length === 0){
		tag_T.characters = 'Heading';
		heading_T.visible = false;
	}else(heading_T.characters = heading)

    heading_T.textAutoResize = "HEIGHT";
    heading_T.layoutAlign = "STRETCH";


	// Rating
	
	let Rating_F = figma.createFrame();
	description_F.appendChild(Rating_F);
	Rating_F.layoutMode = "HORIZONTAL";
	Rating_F.primaryAxisSizingMode = "AUTO";
    Rating_F.counterAxisSizingMode = "AUTO";
	// @ts-ignore
	Rating_F.fills = [transparent]

	for (let i = 0; i < 5; i++) {
		if(rating>i){
			let star_selected = figma.createNodeFromSvg(helperfunctions.star_selected);
			Rating_F.appendChild(star_selected);
		}else{
			let star_unselected = figma.createNodeFromSvg(helperfunctions.star_unselected);
			Rating_F.appendChild(star_unselected);
		}
	}
	
	// Descriprion

	let description_T = figma.createText();
	description_F.appendChild(description_T);
	description_T.fontName = italicFont;
	description_T.fills = [{type : "SOLID", color: fontcolor_primary}]
	if(description.length === 0){
		description_T.characters = 'Description';
		description_T.visible = false;
	}else(description_T.characters = description)


    description_T.textAutoResize = "WIDTH_AND_HEIGHT";
    description_T.layoutAlign = "STRETCH";

	//__________________________//__________________________//


	let divider = figma.createFrame();
	divider.resize(500,1);

	cardFrame.appendChild(divider);
	divider.fills = [{opacity:1, type : "SOLID", color: color_divider}]
	


 	//__________________________//__________________________//

	let comment = figma.createFrame();
	cardFrame.appendChild(comment);
	comment.paddingLeft = comment.paddingRight = cardPadding
	comment.itemSpacing = cardPadding/2;
	comment.layoutMode = "VERTICAL";
	comment.primaryAxisSizingMode = "AUTO";
    comment.counterAxisSizingMode = "FIXED";
	comment.layoutAlign= "STRETCH";
	// @ts-ignore
	comment.fills = [transparent]


	// Images
	if (metaTags!='None'){
		let imageHash = figma.createImage(metaTags.data).hash
		const rect = figma.createRectangle()
		rect.resize(imageWidth, imageWidth / (metaTags.width / metaTags.height));
		rect.fills = [ { type: "IMAGE", scaleMode: "FIT", imageHash } ]
		comment.appendChild(rect);
	}


	let title = figma.createFrame();
	comment.appendChild(title);
	title.layoutMode = "VERTICAL";
	// @ts-ignore
	title.primaryAxisSizingMode = "AUTO";
	title.counterAxisSizingMode = "AUTO";
	// // @ts-ignore
	// title.primaryAxisAlignItems = "SPACE_BETWEEN";
	// title.layoutAlign= "STRETCH";
	// @ts-ignore
	title.fills = [transparent]


	
	//title
	let autor_T = figma.createText();
	title.appendChild(autor_T);
    autor_T.fontName = boldFont;
	autor_T.fills = [{type : "SOLID", color: fontcolor_primary}]
    autor_T.characters = autor;
    autor_T.textAutoResize = "HEIGHT";
    autor_T.layoutAlign = "STRETCH";
	
	//date
	let date_T = figma.createText();
	title.appendChild(date_T);
    date_T.fontName = italicFont;
	date_T.fills = [{type : "SOLID", color: color_accent}]
    date_T.characters = date;
    date_T.textAutoResize = "WIDTH_AND_HEIGHT";
    date_T.layoutAlign = "STRETCH";

	// description
	let comment_T = figma.createText();
	comment.appendChild(comment_T);
	comment_T.fontName = italicFont;
	comment_T.fills = [{type : "SOLID", color: fontcolor_primary}]
    comment_T.characters = markedSent.sent;

	markedSent.Start.map((currElement, index) => {
		comment_T.setRangeFills(markedSent.Start[index],markedSent.End[index],[{type : "SOLID", color: color_accent}])
		comment_T.setRangeFontName(markedSent.Start[index],markedSent.End[index],boldFont)
	})

    comment_T.textAutoResize = "WIDTH_AND_HEIGHT";
    comment_T.layoutAlign = "STRETCH";

	// link



	
	let link_F = figma.createFrame();
	comment.appendChild(link_F);
	link_F.layoutMode = "HORIZONTAL";
	link_F.itemSpacing = 4;
	link_F.counterAxisSizingMode = "AUTO";
	// @ts-ignore
	link_F.primaryAxisSizingMode = "AUTO";
	// @ts-ignore
	link_F.fills =  [transparent]
	const Arrow = figma.createNodeFromSvg(helperfunctions.arrow);
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

	return cardFrame

}