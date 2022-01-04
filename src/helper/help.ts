// global.ts

export function getMarkedPartsOfSent (start,end,sent){
	let reStart = new RegExp(start,'gi');
	let reEnd = new RegExp(end,'gi');
	let startMark = new Array();
	let endMark = new Array();
	while (reStart.exec(sent)){
		startMark.push(reStart.lastIndex);
	}
	while (reEnd.exec(sent)){
		endMark.push(reEnd.lastIndex);
	}
	// console.log(startMark,endMark)
	let NewStartArray =  new Array();
	startMark.map((currElement, index) => {
		let subtract = ((index+1)*start.length)+(index*end.length)
		NewStartArray.push(currElement - subtract)
	})
	// console.log(NewStartArray)
	let NewEndArray =  new Array();
	endMark.map((currElement, index) => {
		let subtract = ((index+1)*start.length)+((index+1)*end.length)
		NewEndArray.push(currElement - subtract)
	})
	let cleanedSent = sent.replaceAll(start, "").replaceAll(end, "")
	let sentObject = {"sent":cleanedSent,"Start":NewStartArray,"End":NewEndArray}
	return sentObject
}





let arrow = `<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M8.47534 7.28992L11.3305 10.145L8.67225 12.8033" stroke="#DDE58E"/>
	<path d="M1 0.810425V10.0465H10.6343" stroke="#DDE58E"/></svg>`;

let star_selected = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#EDF67D"/>
</svg>
`

let star_unselected = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#33373A"/>
</svg>
`

export {arrow,star_unselected,star_selected};