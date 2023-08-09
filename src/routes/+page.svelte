<script>
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { stopTyping } from '$lib/actions.js';
	let textIn = `Enter some beeps to boop.`;
	let binary = `01000101 01101110 01110100 01100101 01110010 00100000 01110011 01101111 01101101 01100101 00100000 01100010 01100101 01100101 01110000 01110011 00100000 01110100 01101111 00100000 01100010 01101111 01101111 01110000 00101110`;
	let beepboops = `Boopbeepboopboopboopbeepboopbeep Boopbeepbeepboopbeepbeepbeepboop Boopbeepbeepbeepboopbeepboopboop Boopbeepbeepboopboopbeepboopbeep Boopbeepbeepbeepboopboopbeepboop Boopboopbeepboopboopboopboopboop Boopbeepbeepbeepboopboopbeepbeep Boopbeepbeepboopbeepbeepbeepbeep Boopbeepbeepboopbeepbeepboopbeep Boopbeepbeepboopboopbeepboopbeep Boopboopbeepboopboopboopboopboop Boopbeepbeepboopboopboopbeepboop Boopbeepbeepboopboopbeepboopbeep Boopbeepbeepboopboopbeepboopbeep Boopbeepbeepbeepboopboopboopboop Boopbeepbeepbeepboopboopbeepbeep Boopboopbeepboopboopboopboopboop Boopbeepbeepbeepboopbeepboopboop Boopbeepbeepboopbeepbeepbeepbeep Boopboopbeepboopboopboopboopboop Boopbeepbeepboopboopboopbeepboop Boopbeepbeepboopbeepbeepbeepbeep Boopbeepbeepboopbeepbeepbeepbeep Boopbeepbeepbeepboopboopboopboop Boopboopbeepboopbeepbeepbeepboop`;
	let beep = 1;
	let boop = 0;
	
	let typing = false;

	let translations

	initialize()

	let textOut = translations.robot.join(' ');

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
		if (stringArray.length < 1) {
			return [];
		}
		return stringArray.map(value => value.charCodeAt(0));
	}

	function intToString(intArray) {
		if (intArray.length < 1) {
			return [];
		}
		return intArray.map(value => String.fromCharCode(value));
	}

	function binaryToInt(binaryArray) {
		if (binaryArray.length < 1) {
			return [];
		}
		return binaryArray.map(value => parseInt(value, 2));
	}

	function intToBinary(intArray) {
		if (intArray.length < 1) {
			return [];
		}
		return intArray.map(value => value.toString(2).padStart(8, '0'));
	}

	function binaryToRobot(binaryArray) {
		if (binaryArray.length < 1) {
			return [];
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

	function robotToBinary(robotArray) {
		if (robotArray.length < 1) {
			return [];
		}
		return robotArray.map(value => {
			let binaryString = '';
			let i = 0
			while(i < value.length) {
				console.log(value.substring(i + 1, i + 4))
				if(value.substring(i + 1, i + 4) === 'eep') {
					binaryString += '1';
				} else if (value.substring(i+1, i + 4) === 'oop') {
					binaryString += '0';
				} else {
					return 'Error: Invalid beep boop';
				}

				i += 4
			}
			return binaryString;
		});
	}

	function octalToInt(value) {
		return []
	}

	function intToOctal(value) {
		return []
	}

	function hexToInt(value) {
		return []
	}

	function intToHex(value) {
		return []
	}

	function customToInt(value) {
		return []
	}

	function intToCustom(value) {
		return []
	}

	// $: if (typing === false && textIn != translations[inType]) {
	function updateTranslations() {
		translate();
		textOut = translations[outType].join(outType != 'text' ? ' ': '');
		
	}

	function changeTypeIn() {
		textIn = translations[inType].join(inType != 'text' ? ' ': '');
	}

	function changeTypeOut() {
		textOut = translations[outType].join(outType != 'text' ? ' ': '');
	}

	function swapTypes() {
		let temp = inType;
		inType = outType;
		outType = temp;
		changeTypeIn()
		changeTypeOut()
	}

	function translate() {
		
		switch (inType) {
			case 'text':
				translations.text = textIn.trim().split(/(?:)/u);
				translations.int = stringToInt(translations.text);
				break;
			case 'binary':
				translations.text = textIn.trim().split(/(?:)/u);
				translations.int = binaryToInt(textIn.split(' '));
				break;
			case 'robot':
				translations.binary = robotToBinary(textIn.trim().split(' '));
				translations.int = binaryToInt(translations.binary);
				break;
			case 'octal':
				translations.int = octalToInt(textIn.split(' '));
				break;
			case 'hex':
				translations.int = hexToInt(textIn.split(' '));
				break;
			case 'custom':
				translations.int = customToInt(textIn.split(' '));
				break;
			default:
				textOut = 'Error: Invalid input type';
				return;
		}

		if(textIn != 'text') {
			translations.text = intToString(translations.int);
		}
		if(textIn != 'binary') {
			translations.binary = intToBinary(translations.int);
		}
		if(textIn != 'robot') {
			translations.robot = binaryToRobot(translations.binary);
		}
		if(textIn != 'octal') {
			translations.octal = intToOctal(translations.int);
		}
		if(textIn != 'hex') {
			translations.hex = intToHex(translations.int);
		}
		if(textIn != 'custom') {
			translations.custom = intToCustom(translations.int);
		}
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
	<div hidden class="logging justify-self-end bg-cyan-800 p-4 rounded shadow-md">
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
				<p>{translations.binary.join(' ').slice(0,80)+"..."}</p>
			</li>
			<li style="flex: 1 0 auto">
				<h3>Beep boop:</h3>
				<p>{translations.robot.join(' ').slice(0,80)+"..."}</p>
			</li>
		</ul>
	</div>

	{@debug textIn}
	{@debug textOut}
	{@debug inType}
	{@debug outType}
	{@debug typing}
	{@debug translations}

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
					on:stopTyping={() => {
						typing = false
						updateTranslations()
						}}
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
