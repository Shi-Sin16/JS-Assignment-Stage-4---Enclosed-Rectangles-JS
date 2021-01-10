//rec = {
//	top: '25px',
//	left: '96px',
//	width: '64px',
//	height: '96px',
//      children: []
//}

function updateStructure(rec1,rec2){
	//write your code
	//contains(A, B) returns true/false if B is contained in A
	//relative(A, B) returns relative dimensions of B with respect to A
	if(contains(rec1, rec2)) {
		const relativeDim = relative(rec1, rec2);
		return { ...rec1,children: [relativeDim] };
	} else if(contains(rec2, rec1)) {
		const relativeDim = relative(rec2, rec1);
		return { ...rec2, children: [relativeDim] };
	} else {
		return { ...rec1 };
	}
}

//relative dimensions of rec2 wrt to rec1
function relative(rec1, rec2) {
	const rec1N = normalize(rec1);
	const rec2N = normalize(rec2);

	const res = {
		children: rec2.children
	}

	if(rec2.top) {
		res.top = `${rec2N.x1 - rec1N.x1}px`;
	}
	if(rec2.left) {
		res.left = `${rec2N.y1 - rec1N.y1}px`;
	}
	if(rec2.height) {
		res.height = rec2.height;
	}
	if(rec2.width) {
		res.width = rec2.width;
	}
	if(rec2.bottom) {
		res.bottom = `${rec1N.x2 - rec2N.x2}px`;
	}
	if(rec2.right) {
		res.right = `${rec1N.y2 - rec2N.y1}px`;
	}
	return res;
}

function contains(rec1, rec2) {
	const rec1N = normalize(rec1);
	const rec2N = normalize(rec2);

	if(
		rec1N.x1 <= rec2N.x1
		&& rec1N.y1 <= rec2N.y1
		&& rec1N.x2 >= rec2N.x2
		&& rec2N.y2 >= rec2N.y2
	) {
		return true;
	}
	return false;
}

const T = 0; //total height //assume
const W = 0; //total width //assume

function normalize(rec)
{
	return {
		x1: rec.top ? parseInt(rec.top) : (T - (parseInt(rec.bottom) + parseInt(rec.height))),
		y1: rec.left ? parseInt(rec.left) : (W - (parseInt(rec.right) + parseInt(rec.width))),
		x2: rec.bottom ? (T - parseInt(rec.bottom)) : (parseInt(rec.top) + parseInt(rec.height)),
		y2: rec.right ? (W - parseInt(rec.right)) : (parseInt(rec.left) + parseInt(rec.width))
	}
}

module.exports = updateStructure;
