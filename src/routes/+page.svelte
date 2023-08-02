<script>
	import { beforeUpdate, afterUpdate } from 'svelte';
	let text = `Enter some beeps to boop.`;
	let binary = `01000101 01101110 01110100 01100101 01110010 00100000 01110011 01101111 01101101 01100101 00100000 01100010 01100101 01100101 01110000 01110011 00100000 01110100 01101111 00100000 01100010 01101111 01101111 01110000 00101110`
	let beepboops = `Boop beep boop boop boop beep boop beep    Boop beep beep boop beep beep beep boop    Boop beep beep beep boop beep boop boop    Boop beep beep boop boop beep boop beep    Boop beep beep beep boop boop beep boop    Boop boop beep boop boop boop boop boop    Boop beep beep beep boop boop beep beep    Boop beep beep boop beep beep beep beep    Boop beep beep boop beep beep boop beep    Boop beep beep boop boop beep boop beep    Boop boop beep boop boop boop boop boop    Boop beep beep boop boop boop beep boop    Boop beep beep boop boop beep boop beep    Boop beep beep boop boop beep boop beep    Boop beep beep beep boop boop boop boop    Boop beep beep beep boop boop beep beep    Boop boop beep boop boop boop boop boop    Boop beep beep beep boop beep boop boop    Boop beep beep boop beep beep beep beep    Boop boop beep boop boop boop boop boop    Boop beep beep boop boop boop beep boop    Boop beep beep boop beep beep beep beep    Boop beep beep boop beep beep beep beep    Boop beep beep beep boop boop boop boop    Boop boop beep boop beep beep beep boop`;
	let beep = 1
	let boop = 0

	function baseConvert(base, value) {
		// check to make sure base is int
		// check if the value is a number
		// if it is, coerce to an int
		// then use toString to convert
		// if it's not, loop through each character
		// and use charCodeAt(0).toString(base) to convert
		
	}

	function updateFromText(value) {
		let binaryOutput = ""
		let beepboopOutput = ""
		let length = value.length
		if (length === 0) {
			return
		}
		for (let i = 0; i < value.length; i++) {
			let binaryString = value[i].charCodeAt(0).toString(2).padStart(8,'0')
			for(let j = 0; j < binaryString.length; j++) {
				if (j === 0) {
					beepboopOutput += "B"
				} else {
					beepboopOutput += "b"
				}
				if (binaryString[j] === "0") {
					beepboopOutput += "oop"
				}
				if (binaryString[j] === "1") {
					beepboopOutput += "eep"
				}
				if(j+1 != binaryString.length) {
					beepboopOutput += " "
				}
			}
			binaryOutput += binaryString
			if(i+1 != value.length) {
				binaryOutput += " "
				beepboopOutput += "    "
			}
		}
		binary = binaryOutput
		beepboops = beepboopOutput

	}
	
	function toBinary() {
		
	}

	function toBeepBoops() {
			
	}
	
</script>

<div class="layout">
	<p>
		<span style="color:cyan;font-weight:600">Return</span> to translate
	</p>

	<div>
		<label for="string input">Input</label>
		<input type="text" name="string input" bind:value={text} 
			on:change={(e) => updateFromText(e.target.value)}
			on:click|preventDefault={(e) => updateFromText(e.target.value)}
		/>
	</div>

	<div>
		Binary output
		<textarea bind:value={binary} />
	</div>

	<div>
		beep boops
		<textarea bind:value={beepboops} />
	</div>
</div>
<style>
	input {
		width: 100%;
	}
	textarea {
		width: 100%;
		height: 200px;
	}
	.layout {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: normal;
	  align-items: normal;
	  align-content: normal;
	}
	.layout > * {
		display: block;
	  flex-grow: 0;
	  flex-shrink: 1;
	  flex-basis: auto;
	  align-self: auto;
	  order: 0;
		margin: .75rem .5rem;
	}
</style>
