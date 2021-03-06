const data = [];

const films = [
	{
		value: "IronMan",
		label: "Iron Man",
		canWatch: true,
		price: 200000,
		timeShow: "08/03/2022 09:00PM"
	},
	{
		value: "SpiderMan",
		label: "Spider Man",
		canWatch: true,
		price: 250000,
		timeShow: "20/11/2022 06:30PM"
	},
	{
		value: "Hulk",
		label: "Hulk",
		canWatch: true,
		price: 245000,
		timeShow: "14/02/2022 11:20AM"
	}
];

const container = document.querySelector("div.cinema-container");
const form = document.querySelector("form#register-form");
const close = document.querySelector("form#register-form > h2#close");
const select = document.querySelector("form#register-form > select");
const price = document.querySelector("form#register-form > h4");
const alertHTML = document.querySelector("div.alert");
const closeAlert = document.querySelector("div.alert > button.close-alert");

closeAlert.addEventListener("click", () => {
	alertHTML.classList.add("close-form");
});

for (let i = 0; i < films.length; i++) {
	const item = films[i];
	if (item.canWatch) {
		const option =
			"<option" + " value=" + item.value + ">" + item.label + "</option>";
		select.innerHTML += option;
	}
}

select.addEventListener("change", e => {
	for (let i = 0; i < films.length; i++) {
		const item = films[i];
		if (item.value === e.target.value) {
			price.innerHTML = "Giá vé: " + item.price + " VND";
		}
	}
});

form.addEventListener("submit", e => {
	e.preventDefault();
	const username = e.target.elements.nameuser.value;
	const selectValue = select.value;
	let checkSelect;
	const seatID = form.getAttribute("data-seat");
	for (let i = 0; i < films.length; i++) {
		const item = films[i];
		if (item.value === selectValue) {
			checkSelect = item;
		}
	}
	if (username !== "" && checkSelect !== undefined) {
		data[seatID - 1].hasSeat = true;
		data[seatID - 1].name = username;
		data[seatID - 1].tickets.push({
			date: Date(),
			timeShow: checkSelect.timeShow,
			premiere: null
		});
		const alertHTMLTxt =
			"Đặt vé thành công! Thời gian chiếu phim " + checkSelect.timeShow;
		alert(alertHTMLTxt);
		RenderSeat(alertHTMLTxt);
		form.classList.add("close-form");
	}
});

close.addEventListener("click", () => {
	form.classList.add("close-form");
});

for (let i = 1; i < 31; i++) {
	const form = {
		id: i,
		name: null,
		hasSeat: false,
		tickets: []
	};
	data.push(form);
}

function RenderSeat() {
	container.innerHTML = "";
	for (let i = 0; i < data.length; i++) {
		const item = data[i];
		const row = String.fromCharCode(65 + (item.id - 1) / 3);
		let HTML = "";
		if (item.hasSeat) {
			HTML =
				'<div class="cinema-seat has-seat"' +
				" id=" +
				item.id +
				"><h4>" +
				row +
				item.id +
				"</h4></div>";
		} else {
			HTML =
				'<div class="cinema-seat no-seat"' +
				" id=" +
				item.id +
				"><h4>" +
				row +
				item.id +
				"</h4></div>";
		}
		container.innerHTML += HTML;
	}
	ClickSeat();
}
RenderSeat();

function ClickSeat() {
	const seatsEl = document.querySelectorAll("div.cinema-seat");
	for (let i = 0; i < seatsEl.length; i++) {
		const item = seatsEl[i];
		item.addEventListener("click", () => {
			if (item.classList[1] === "has-seat") {
				alertHTML.classList.remove("close-form");
			} else {
				form.classList.remove("close-form");
				form.setAttribute("data-seat", item.id);
				const nameSeat = form.querySelector("h1");
				nameSeat.innerHTML =
					"Chỗ ngồi " + item.querySelector("h4").innerHTML;
				form.elements.nameuser.value = "";
				select.value = "Chọn phim";
				price.innerHTML = "";
			}
		});
	}
}
