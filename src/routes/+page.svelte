<script>
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { stopTyping } from '$lib/actions.js';
	
	import { variants } from '@catppuccin/palette';
	let selected = 'mocha';

	// TODO: Verify whether these defaults are used:
	// textIn: [ ] Yes; [ ] No
	let textIn = `Enter some beeps to boop.`;
	// binary: [ ] Yes; [ ] No
	let binary = `01000101 01101110 01110100 01100101 01110010 00100000 01110011 01101111 01101101 01100101 00100000 01100010 01100101 01100101 01110000 01110011 00100000 01110100 01101111 00100000 01100010 01101111 01101111 01110000 00101110`;
	// beepboops: [ ] Yes; [ ] No
	let beepboops = `Boopbeepboopboopboopbeepboopbeep Boopbeepbeepboopbeepbeepbeepboop Boopbeepbeepbeepboopbeepboopboop Boopbeepbeepboopboopbeepboopbeep Boopbeepbeepbeepboopboopbeepboop Boopboopbeepboopboopboopboopboop Boopbeepbeepbeepboopboopbeepbeep Boopbeepbeepboopbeepbeepbeepbeep Boopbeepbeepboopbeepbeepboopbeep Boopbeepbeepboopboopbeepboopbeep Boopboopbeepboopboopboopboopboop Boopbeepbeepboopboopboopbeepboop Boopbeepbeepboopboopbeepboopbeep Boopbeepbeepboopboopbeepboopbeep Boopbeepbeepbeepboopboopboopboop Boopbeepbeepbeepboopboopbeepbeep Boopboopbeepboopboopboopboopboop Boopbeepbeepbeepboopbeepboopboop Boopbeepbeepboopbeepbeepbeepbeep Boopboopbeepboopboopboopboopboop Boopbeepbeepboopboopboopbeepboop Boopbeepbeepboopbeepbeepbeepbeep Boopbeepbeepboopbeepbeepbeepbeep Boopbeepbeepbeepboopboopboopboop Boopboopbeepboopbeepbeepbeepboop`;
	
	// WHY are the lets? Are they ever going to change?
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
				// check if translations.text is text first or not
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

<div class="wrapper {selected ? selected : ''} bg-base text-text">
	<section class="mx-4 p-4 lg:p-8 lg:mx-16 flex flex-col gap-8 my-2">
		<div class="instructions px-8 py-4 rounded shadow-md bg-mantle">
			<p class="justify-self-start">
				<span class="text-blue font-semibold">Type</span> something to translate!
			</p>
		</div>

		<!-- {@debug textIn}
		{@debug textOut}
		{@debug inType}
		{@debug outType}
		{@debug typing}
		{@debug translations} -->
	
		<form class="py-8 px-8 sm:px-32 md:p-8 bg-mantle rounded shadow-md">
			<div class="focus flex flex-col md:flex-row md:justify-between">
				<div class="input flex flex-col basis-1/2 gap-2">
					<label for="input" class="font-semibold text-lg text-blue">Input</label>
					<select 
						class="p-2 rounded shadow-md bg-crust 
							   focus:outline-none focus:ring-2 focus:ring-lavender
							   text-subtext0 focus:text-rosewater" 
						bind:value={inType} on:change={changeTypeIn}>
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
						spellcheck="false"
						class="p-2 rounded-md shadow-sm bg-crust
						  	   focus:outline-none focus:ring-2 focus:ring-lavender 
							   caret-rosewater text-subtext0 focus:text-rosewater"
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
					<label for="output" class="font-semibold text-lg text-pink">Output</label>
					<select 
						class="p-2 rounded shadow-md bg-crust 
						focus:outline-none focus:ring-2 focus:ring-lavender
						text-subtext0 focus:text-rosewater" 
			 			bind:value={outType} on:change={changeTypeOut}>
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
						class="p-2 rounded-md shadow-sm bg-crust text-subtext0"
						bind:value={textOut}
					/>
				</div>
			</div>
		</form>

		<div hidden class="logging justify-self-end px-8 py-6 roun8ed-xl shadow-md bg-mantle">
			<h2 class="text-xl text-teal border-b-solid border-b-2 border-teal pb-1 font-semibold">Logging</h2>
			<div class="logging-interface">
				<h3 class="text-subtext0 text-lg my-2">Interface</h3>
				<ul class="flex gap-2 flex-wrap flex-row items-baseline content-stretch justify-around bg-crust">
					<li style="flex: 1 0 auto;" class="px-2 py-1">
						<h4 class="text-teal">Typing:</h4>
						<p class="text-green">{typing}</p>
					</li>
					<li style="flex: 1 0 auto;" class="px-2 py-1">
						<h4 class="text-teal">Input type:</h4>
						<p class="text-green">{inType}</p>
					</li>
					<li style="flex: 1 0 auto;" class="px-2 py-1">
						<h4 class="text-teal">Input:</h4>
						<p class="text-green">{textIn.slice(0,73)+"..."}</p>
					</li>
					<li style="flex: 1 0 auto;" class="px-2 py-1">
						<h4 class="text-teal">Output type:</h4>
						<p class="text-green">{outType}</p>
					</li>					
					<li style="flex: 1 0 auto;" class="px-2 py-1">
						<h4 class="text-teal">Output:</h4>
						<p class="text-green">{textOut.slice(0,73)+"..."}</p>
					</li>

				</ul>
			</div>
			<div class="logging-adapter">
				<h3 class="text-subtext0 text-lg my-2">Conversion</h3>
				<ul class="flex gap-2 flex-wrap flex-row items-baseline content-stretch justify-around bg-crust">
					<li style="flex: 1 0 auto;" class="px-2 py-1">
						<h4 class="text-teal">Text:</h4>
						<p class="text-green">{translations.text}</p>
					</li>
					<li style="flex: 1 0 auto;" class="px-2 py-1">
						<h4 class="text-teal">Int:</h4>
						<p class="text-green">{translations.int}</p>
					</li>
					<li style="flex: 1 0 auto;" class="px-2 py-1">
						<h4 class="text-teal">Binary:</h4>
						<p class="text-green">{translations.binary.join(' ').slice(0,80)+"..."}</p>
					</li>
					<li style="flex: 1 0 auto" class="px-2 py-1">
						<h4 class="text-teal">Beep boop:</h4>
						<p class="text-green">{translations.robot.join(' ').slice(0,73)+"..."}</p>
					</li>
				</ul>
			</div>
		</div>
	</section>
</div>

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
