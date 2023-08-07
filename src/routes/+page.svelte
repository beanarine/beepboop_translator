<script>
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { stopTyping } from '$lib/actions.js';
	let text = `Enter some beeps to boop.`;
	let binary = `01000101 01101110 01110100 01100101 01110010 00100000 01110011 01101111 01101101 01100101 00100000 01100010 01100101 01100101 01110000 01110011 00100000 01110100 01101111 00100000 01100010 01101111 01101111 01110000 00101110`;
	let beepboops = `Boop beep boop boop boop beep boop beep    Boop beep beep boop beep beep beep boop    Boop beep beep beep boop beep boop boop    Boop beep beep boop boop beep boop beep    Boop beep beep beep boop boop beep boop    Boop boop beep boop boop boop boop boop    Boop beep beep beep boop boop beep beep    Boop beep beep boop beep beep beep beep    Boop beep beep boop beep beep boop beep    Boop beep beep boop boop beep boop beep    Boop boop beep boop boop boop boop boop    Boop beep beep boop boop boop beep boop    Boop beep beep boop boop beep boop beep    Boop beep beep boop boop beep boop beep    Boop beep beep beep boop boop boop boop    Boop beep beep beep boop boop beep beep    Boop boop beep boop boop boop boop boop    Boop beep beep beep boop beep boop boop    Boop beep beep boop beep beep beep beep    Boop boop beep boop boop boop boop boop    Boop beep beep boop boop boop beep boop    Boop beep beep boop beep beep beep beep    Boop beep beep boop beep beep beep beep    Boop beep beep beep boop boop boop boop    Boop boop beep boop beep beep beep boop`;
	let beep = 1;
	let boop = 0;
	let textIn = 'text';
	let textOut = 'text';
	let typing = false;

	let translations = {
		text: text,
		int: '',
		binary: binary,
		robot: '',
		octal: '',
		hex: '',
		custom: ''
	};

	let inType = 'text';
	let outType = 'robot';

	function stringToInt(value) {
		if (value.length === 0) {
			return;
		}
		const out = value.split(/(?:)/u).map((char) => char.charCodeAt(0));
		return out;
		// let intValue = '';
		// for (let i = 0; i < value.length; i++) {
		// 	let intChar = value[i].charCodeAt(0);
		// 	intValue += intChar;
		// 	if (i + 1 != value.length) {
		// 		intValue += ' ';
		// 	}
		// }
		// return intValue;
	}

	function intToString(value) {
		if (value.length === 0) {
			return;
		}
		let stringValue = '';
		let intArray = value.split(' ');
		for (let i = 0; i < intArray.length; i++) {
			let stringChar = String.fromCharCode(intArray[i]);
			stringValue += stringChar;
		}
		return stringValue;
	}

	function binaryToInt(value) {
		if (value.length === 0) {
			return;
		}
		let intValue = '';
		let binaryArray = value.split(' ');
		for (let i = 0; i < binaryArray.length; i++) {
			let intChar = parseInt(binaryArray[i], 2);
			if (intChar) {
				intValue += intChar + ' ';
			}
		}
		return value; //intValue;
	}

	function intToBinary(intArray) {
		if (intArray.length < 1) {
			return 0;
		}
		let binaryValue = [];
		for (let i = 0; i < intArray.length; i++) {
			binaryValue.push(intArray[i].toString(2));
		}
		return binaryValue;
	}

	function robotToInt(value) {
		if (value.length === 0) {
			return;
		}
		let intValue = '';
		for (let i = 0; i < value.length; i++) {
			let binaryString = '';
			for (let j = 0; j < value[i].length; j++) {
				if (value[i][j] === 'B') {
					binaryString += '1';
				} else if (value[i][j] === 'b') {
					binaryString += '0';
				}
			}
			let intChar = parseInt(binaryString, 2);
			if (intChar) {
				intValue += intChar + ' ';
			}
		}
		return intValue;
	}

	function intToRobot(value) {
		if (value.length === 0) {
			return;
		}
		let beepboopValue = '';
		for (let i = 0; i < value.length; i++) {
			let binaryChar = value[i].toString(2);
			let beepboopChar = '';
			for (let j = 0; j < binaryChar.length; j++) {
				if (j === 0) {
					beepboopChar += 'B';
				} else {
					beepboopChar += 'b';
				}
				if (binaryChar[j] === '0') {
					beepboopChar += 'oop';
				} else if (binaryChar[j] === '1') {
					beepboopChar += 'eep';
				}
			}
			beepboopChar += ' ';
			beepboopValue += beepboopChar;
		}
		return beepboopValue.trim();
	}

	$: if (typing === false && textIn != translations[inType]) {
		translate();
		textOut = translations[outType];
	}

	function changeTypeIn() {
		textIn = translations[inType];
	}

	function changeTypeOut() {
		textOut = translations[outType];
	}

	function translate() {
		translations[inType] = textIn;
		switch (inType) {
			case 'text':
				translations['int'] = stringToInt(textIn);
				break;
			case 'binary':
				translations['int'] = binaryToInt(textIn);
				break;
			case 'robot':
				translations['int'] = robotToInt(textIn);
				break;
			case 'octal':
				translations['int'] = octalToInt(textIn);
				break;
			case 'hex':
				translations['int'] = hexToInt(textIn);
				break;
			case 'custom':
				translations['int'] = customToInt(textIn);
				break;
			default:
				textOut = 'Error: Invalid input type';
				return;
		}
		switch (outType) {
			case 'text':
				translations['text'] = intToString(translations['int']);
				break;
			case 'binary':
				translations['binary'] = intToBinary(translations['int']);
				break;
			case 'robot':
				translations['robot'] = intToRobot(translations['int']);
				break;
			case 'octal':
				translations['octal'] = intToOctal(translations['int']);
				break;
			case 'hex':
				translations['hex'] = intToHex(translations['int']);
				break;
			case 'custom':
				translations['custom'] = intToCustom(translations['int']);
				break;
			default:
				textOut = 'Error: Invalid output type';
				return;
		}
	}

	// async function updateOutput() {
	// 	console.log('I am updating the output');
	// 	if (textIn.length === 0) {
	// 		return;
	// 	}
	// 	textOut = "I'm a robot";
	// }

	function updateFromText(value) {
		let binaryOutput = '';
		let beepboopOutput = '';
		let length = value.length;
		if (length === 0) {
			return;
		}
		for (let i = 0; i < value.length; i++) {
			let binaryString = value[i].charCodeAt(0).toString(2).padStart(8, '0');
			console.log(binaryString);
			for (let j = 0; j < binaryString.length; j++) {
				if (j === 0) {
					beepboopOutput += 'B';
				} else {
					beepboopOutput += 'b';
				}
				if (binaryString[j] === '0') {
					beepboopOutput += 'oop';
				}
				if (binaryString[j] === '1') {
					beepboopOutput += 'eep';
				}
				if (j + 1 != binaryString.length) {
					beepboopOutput += ' ';
				}
			}
			binaryOutput += binaryString;
			if (i + 1 != value.length) {
				binaryOutput += ' ';
				beepboopOutput += '    ';
			}
		}
		binary = binaryOutput;
		beepboops = beepboopOutput;
		textOut = beepboopOutput;
	}

	function toBinary() {}

	function toBeepBoops() {}
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<section class="mx-4 lg:mx-16">
	<div class="instructions my-2 ghost">
		<p class="justify-self-start">
			<span style="color:cyan;font-weight:600">Return</span> to translate!
		</p>
	</div>
	<div class="logging justify-self-end bg-cyan-800 p-4 rounded shadow-md" on:load={translate()}>
		<h2 class="text-lg border-b-solid border-b-2 border-cyan-500">Logging</h2>
		<ul class="my-2 flex gap-2 flex-wrap flex-row items-baseline content-stretch justify-around">
			<li style="flex: 1 0 auto;">
				<h3>Typing:</h3>
				<p>{typing}</p>
			</li>
			<li style="flex: 1 0 auto;">
				<h3>Text:</h3>
				<p>{translations.text}</p>
			</li>
			<li style="flex: 1 0 auto;">
				<h3>Int:</h3>
				<p>{translations.int}</p>
			</li>
			<li style="flex: 0 1 auto;">
				<h3>Binary:</h3>
				<p>{translations.binary}</p>
			</li>
			<li style="flex: 1 0 auto;">
				<h3>Beep boop:</h3>
				<p>{translations.robot}</p>
			</li>
		</ul>
	</div>

	<form class="my-4 py-8 px-8 sm:px-32 md:p-8 bg-pink-800 rounded shadow-md">
		<div class="focus flex flex-col md:flex-row md:justify-between">
			<div class="input flex flex-col basis-1/2 gap-2">
				<label for="input">Input</label>
				<select class="p-2 rounded shadow-md" bind:value={inType} on:change={changeTypeIn}>
					<option value="text">Plaintext</option>
					<option value="robot">Beep boops</option>
					<option value="binary">Binary</option>
					<option value="octal" disabled>Octal (not yet implemented)</option>
					<option value="hex" disabled>Hex (not yet implemented)</option>
					<option value="custom" disabled>Custom (not yet implemented)</option>
				</select>
				<textarea
					type="text"
					name="input"
					rows="4"
					class="p-2 rounded-md shadow-sm caret-pink-500
                 focus:outline-none focus:ring-2 focus:ring-pink-500"
					bind:value={textIn}
					use:stopTyping
					on:keydown={() => (typing = true)}
					on:stopTyping={() => (typing = false)}
				/>
			</div>
			<label for="swap">Not yet implemented</label>
			<button name="swap" disabled class="material-symbols-outlined py-4 ghost">
				<span class="block md:hidden">swap_vertical_circle</span>
				<span class="hidden md:block">swap_horizontal_circle</span>
			</button>
			<div class="output flex flex-col basis-1/2 gap-2">
				<label for="output">Output</label>
				<select class="p-2 rounded shadow-md" bind:value={outType} on:change={changeTypeOut}>
					<option value="text">Plaintext</option>
					<option value="robot">Beep boops</option>
					<option value="binary">Binary</option>
					<option value="octal" disabled>Octal (not yet implemented)</option>
					<option value="hex" disabled>Hex (not yet implemented)</option>
					<option value="custom" disabled>Custom (not yet implemented)</option>
				</select>
				<textarea
					type="text"
					name="output"
					rows="4"
					disabled
					class="p-2 rounded-md shadow-sm caret-pink-500
                 focus:outline-none focus:ring-2 focus:ring-pink-500"
					bind:value={textOut}
				/>
			</div>
		</div>
	</form>
</section>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
		font-size: 48px;
	}

	.ghost {
		border-style: dashed;
		border-width: 1px;
		border-color: lightblue;
	}
</style>
