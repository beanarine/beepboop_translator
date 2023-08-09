<script>
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { stopTyping } from '$lib/actions.js';
	let textIn = `Enter some beeps to boop.`;
	let binary = `01000101 01101110 01110100 01100101 01110010 00100000 01110011 01101111 01101101 01100101 00100000 01100010 01100101 01100101 01110000 01110011 00100000 01110100 01101111 00100000 01100010 01101111 01101111 01110000 00101110`;
	let beepboops = `Boop beep boop boop boop beep boop beep    Boop beep beep boop beep beep beep boop    Boop beep beep beep boop beep boop boop    Boop beep beep boop boop beep boop beep    Boop beep beep beep boop boop beep boop    Boop boop beep boop boop boop boop boop    Boop beep beep beep boop boop beep beep    Boop beep beep boop beep beep beep beep    Boop beep beep boop beep beep boop beep    Boop beep beep boop boop beep boop beep    Boop boop beep boop boop boop boop boop    Boop beep beep boop boop boop beep boop    Boop beep beep boop boop beep boop beep    Boop beep beep boop boop beep boop beep    Boop beep beep beep boop boop boop boop    Boop beep beep beep boop boop beep beep    Boop boop beep boop boop boop boop boop    Boop beep beep beep boop beep boop boop    Boop beep beep boop beep beep beep beep    Boop boop beep boop boop boop boop boop    Boop beep beep boop boop boop beep boop    Boop beep beep boop beep beep beep beep    Boop beep beep boop beep beep beep beep    Boop beep beep beep boop boop boop boop    Boop boop beep boop beep beep beep boop`;
	let beep = 1;
	let boop = 0;
	let textOut = 'text';
	let typing = false;

	let translations

	initialize();

	function initialize() {
		const initialText = textIn.split(/(?:)/u);
		const initialInt = stringToInt(initialText);
		const initialBinary = intToBinary(initialInt);
		const initialRobot = binaryToRobot(initialBinary);
		const initialOctal = intToOctal(initialInt);
		const initialHex = intToHex(initialInt);
		const initialCustom = initialRobot;

		translations = {
		text: initialText,
		int: initialInt,
		binary: initialBinary,
		robot: initialRobot,
		octal: initialOctal,
		hex: initialHex,
		custom: initialCustom,
		}
	}

	let inType = 'text';
	let outType = 'robot';

	function stringToInt(stringArray) {
		if (stringArray.length === 0) {
			return 0;
		}
		return stringArray.map(value => value.charCodeAt(0));
	}

	function intToString(intArray) {
		if (intArray.length === 0) {
			return 0;
		}
		return intArray.map(value => String.fromCharCode(value))
	}

	function binaryToInt(binaryArray) {
		if (binaryArray.length === 0) {
			return 0;
		}
		return binaryArray.map(value => parseInt(value, 2));
	}

	function intToBinary(intArray) {
		if (intArray.length < 1) {
			return 0;
		}
		return intArray.map(value => value.toString(2).padStart(8, '0'));
	}

	function binaryToRobot(binaryArray) {
		if (binaryArray.length === 0) {
			return 0;
		}
		return binaryArray.map(value => {
			let beepboopChar = '';
			for (let i = 0; i < value.length; i++) {
				if (i === 0) {
					beepboopChar += 'B';
				} else {
					beepboopChar += 'b';
				}
				if (value[i] === '0') {
					beepboopChar += 'oop';
				} else if (value[i] === '1') {
					beepboopChar += 'eep';
				}
			}
			return beepboopChar;
		});
		
	}

	function robotToInt(binaryArray) {
		if (binaryArray.length === 0) {
			return;
		}
		let intbinaryArray = '';
		for (let i = 0; i < binaryArray.length; i++) {
			let binaryString = '';
			for (let j = 0; j < binaryArray[i].length; j++) {
				if (binaryArray[i][j] === 'B') {
					binaryString += '1';
				} else if (binaryArray[i][j] === 'b') {
					binaryString += '0';
				}
			}
			let intChar = parseInt(binaryString, 2);
			if (intChar) {
				intbinaryArray += intChar + ' ';
			}
		}
		return intbinaryArray;
	}

	function octalToInt(value) {
		return 0
	}

	function intToOctal(value) {
		return 0
	}

	function hexToInt(value) {
		return 0
	}

	function intToHex(value) {
		return 0
	}

	function customToInt(value) {
		return 0
	}

	function intToCustom(value) {
		return 0
	}

	// $: if (typing === false && textIn != translations[inType]) {
	function updateTranslations() {
		translate();
		textOut = translations[outType].join(' ');
	}

	function changeTypeIn() {
		textIn = translations[inType].join(inType != 'text' ? ' ': '');
	}

	function changeTypeOut() {
		textOut = translations[outType].join(outType != 'text' ? ' ': '');;
	}

	function swapTypes() {
		let temp = inType;
		inType = outType;
		outType = temp;
		changeTypeIn()
		changeTypeOut()
	}

	function translate() {
		translations[inType] = textIn;
		switch (inType) {
			case 'text':
				translations['int'] = stringToInt(textIn.split(/(?:)/u));
				break;
			case 'binary':
				translations['int'] = binaryToInt(textIn.split(' '));
				break;
			case 'robot':
				translations['int'] = robotToInt(textIn.split(' '));
				break;
			case 'octal':
				translations['int'] = octalToInt(textIn.split(' '));
				break;
			case 'hex':
				translations['int'] = hexToInt(textIn.split(' '));
				break;
			case 'custom':
				translations['int'] = customToInt(textIn.split(' '));
				break;
			default:
				textOut = 'Error: Invalid input type';
				return;
		}
		translations['text'] = intToString(translations['int']);
		translations['binary'] = intToBinary(translations['int']);
		translations['robot'] = binaryToRobot(translations['binary']);
		translations['octal'] = intToOctal(translations['int']);
		translations['hex'] = intToHex(translations['int']);
		translations['custom'] = intToCustom(translations['int']);

	}
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<section class="mx-4 lg:mx-16">
	<div class="instructions my-2 bg-slate-700 px-8 py-4 rounded shadow-md">
		<p class="justify-self-start">
			<span style="color:cyan;font-weight:600">Type</span> something to translate!
		</p>
	</div>
	<div hidden class="logging justify-self-end bg-cyan-800 p-4 rounded shadow-md" on:load={translate()}>
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
					on:stopTyping={updateTranslations()}
				/>
			</div>
			<button name="swap" class="material-symbols-outlined p-4 " on:click={swapTypes}  >
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
