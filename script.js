/*
* When prev button is clicked, add class, '.for-prev' to '.stand-by-image', else, remove.
*/
const standByImages = document.querySelectorAll('.stand-by-image');
const gallery = document.querySelector('.gallery-container');
const state = {
	currentDirection: 'next',
	x0: null,
	activeRadio: null,
}

document.querySelectorAll('label.arrow-btn').forEach((btn, i) => {
	btn.addEventListener('click', e => {
		if (btn.className.includes('prev')) {
			// Prev button clicked
			addForPrevClass();
			if (state.currentDirection !== 'prev') {
				flipIdPosition(btn.getAttribute('for'), Math.floor(i / 2), 'prev');
			}
			
		} else {
			// Next button clicked
			removeForPrevClass();
			if (state.currentDirection !== 'next') {
				flipIdPosition(btn.getAttribute('for'), Math.floor(i / 2), 'next');
			}
		}

	}, false);
});

function addForPrevClass() {
	gallery.classList.add('for-prev');
}

function removeForPrevClass() {
	gallery.classList.remove('for-prev');
}

function flipIdPosition(id, currentIndex, direction) {
	const targetRadioButton = document.getElementById(id);
	const predecessorImage = standByImages[currentIndex];
	targetRadioButton.classList.add('in-transit');
	predecessorImage.classList.add('predecessor-image');
	state.currentDirection = direction;
	
	setTimeout(() => {
		targetRadioButton.classList.remove('in-transit');
	}, 0);
	setTimeout(() => {
		predecessorImage.classList.remove('predecessor-image');
	}, 500);
}

/*
* Swipe events
*/

gallery.addEventListener('touchstart', handleSwipeStart, false);
//gallery.addEventListener('mousedown', handleSwipeStart, false);
gallery.addEventListener('touchend', handleSwipeEnd, false);
//gallery.addEventListener('mouseup', handleSwipeEnd, false);
gallery.addEventListener('touchmove', handleSwipeMove, false);
//gallery.addEventListener('mousemove', handleSwipeMove, false);

function unifiedE(e) {
	return e.changedTouches ? e.changedTouches[0] : e;
}

function handleSwipeStart(e) {
	state.x0 = unifiedE(e).clientX;
}

function handleSwipeEnd(e) {
	const endX = unifiedE(e).clientX;
	const deltaX = endX - state.x0;
	if (Math.abs(deltaX) > 30) {
		if (deltaX > 0) {
			// trigger prev button
			toggleSwipe('prev');
		} else {
			// trigger next button
			toggleSwipe('next');
		}
	}
	state.activeRadio && state.activeRadio.classList.remove('active');
	state.activeRadio = null;
}

function handleSwipeMove(e) {
	const deltaX = unifiedE(e).clientX - state.x0;
	if (Math.abs(deltaX) > 30) {
		if (deltaX > 0) {
			// get prev button's target radio input and add class to it.
			const targetPrevBtn = document.querySelector('.gallery-container input[type=radio]:checked ~ .prev-btn');
			state.activeRadio = document.getElementById(targetPrevBtn.getAttribute('for'));
			
		} else {
			// get next button's target radio input and add class to it.
			const targetNextBtn = document.querySelector('.gallery-container input[type=radio]:checked ~ .next-btn');
			state.activeRadio = document.getElementById(targetNextBtn.getAttribute('for'));	
		}
		state.activeRadio.classList.add('active');
	}
}

/*
* TODO: fix transition bug when swiping
*/

function toggleSwipe(direction) {
	if (direction === 'prev') {
		const targetPrevBtn = document.querySelector('.gallery-container input[type=radio]:checked ~ .prev-btn');
		//document.getElementById(targetPrevBtn.getAttribute('for')).checked = true;
		targetPrevBtn.click();
	} else if (direction === 'next') {
		const targetNextBtn = document.querySelector('.gallery-container input[type=radio]:checked ~ .next-btn');
		//document.getElementById(targetNextBtn.getAttribute('for')).checked = true;
		targetNextBtn.click();
	}
}


