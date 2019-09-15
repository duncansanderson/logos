import tinycolor from 'tinycolor2'

export const store = {
    state: {
        colours: [
            { name: 'blue-sky', hex: '#85b6c5', background: true, matches: [ '#1d253c', '#653727', 'transparent' ] },
            { name: 'buddy-gold', hex: '#b88a57', background: true, matches: [ '#1d253c', 'transparent' ] },
            { name: 'calm-blue', hex: '#eef4f8', background: true, matches: [ '#1d253c', '#004d80', '#d34e23', '#653727', 'transparent' ] },
            { name: 'claeys-cream', hex: '#f2e4d6', background: true, matches: [ '#1d253c', '#004d80', '#d34e23', '#653727', 'transparent' ] },
            { name: 'heartland-yellow', hex: '#f2ba42', background: true, matches: [ '#1d253c', '#004d80', '#653727', 'transparent' ] },
            { name: 'river-blue', hex: '#004d80', background: true, matches: [ '#f2e4d6', '#f2ba42', '#eef4f8', 'transparent' ] },
            { name: 'rust-belt', hex: '#d34e23', background: true, matches: [ '#1d253c', 'transparent' ] },
            { name: 'strato-blue', hex: '#1d253c', background: true, matches: [ '#f2e4d6', '#f2ba42', '#eef4f8', '#85b6c5', '#d34e23', '#b88a57', 'transparent' ] },
            { name: 'transparent', hex: 'transparent', background: true, matches: [] },
            { name: 'truman-brown', hex: '#653727', background: true, matches: [ '#f2e4d6', '#f2ba42', '#eef4f8', '#85b6c5', 'transparent' ] },
        ],
        backgroundColourHex: '#85b6c5',
        foregroundColourHex: '#1d253c',
        isModalOpen: false,
        svgDownloadLink: '#',
        pngDownloadLink: '#',
        jpgDownloadLink: '#',
        presetSizes: [
            { name: 'Custom' },
            { name: 'Square (2000x2000)', width: 2000, height: 2000 },
            { name: 'Desktop (5120x2880)', width: 5120, height: 2880 },
            { name: 'Mobile (1080x1920)', width: 1080, height: 1920 },
            { name: 'Banner (4500x1500)', width: 4500, height: 1500 },
        ],
        selectedSize: 'Square (2000x2000)',
        imageWidth: 2000,
        imageHeight: 2000,
        imageTooBig: false,
        imageTooSmall: false,
        contrastRatio: 0,
        readabilityTests: [
            { name: 'AA large', level: 'AA', size: 'large', result: false },
            { name: 'AA small', level: 'AA', size: 'small', result: false },
            { name: 'AAA large', level: 'AAA', size: 'large', result: false },
            { name: 'AAA small', level: 'AAA', size: 'small', result: false }
        ]
    },
    // Filter available foreground colours based on selected background colour.
    colourFilter () {
        return this.state.colours.filter( ( colour ) => colour.matches.includes ( this.state.backgroundColourHex ) )
    },
    // Update the selected background colour and available foreground colours.
    updateColours ( colourHex ) {
        this.state.backgroundColourHex = colourHex
        this.state.foregroundColourHex = this.colourFilter()[ 0 ].hex

        this.calcColourRatio()
    },
    // Update the selected foreground colour.
    updateForegroundColour ( colourHex ) {
        this.state.foregroundColourHex = colourHex

        this.calcColourRatio()
    },
    // Calculate the contrast ration between the background and foreground colours and test if they meet the WCAG 2.0 standards.
    calcColourRatio () {
        this.state.contrastRatio = `${tinycolor.readability( this.state.foregroundColourHex, this.state.backgroundColourHex ).toFixed( 1 )}:1`

        this.state.readabilityTests.forEach( ( test ) => {
            test.result = tinycolor.isReadable( this.state.foregroundColourHex, this.state.backgroundColourHex, { level: test.level, size: test.size } )
        } )
    },
    // Open the download modal.
    openModal () {
        this.createDownloadLinks()
        this.state.isModalOpen = true
    },
    // Close the download modal.
    closeModal () {
        this.state.isModalOpen = false
    },
    // Create the SVG, PNG and JPG download data links.
    createDownloadLinks () {
        const svg = document.querySelector( 'svg' ).outerHTML
        const canvas = document.querySelector( 'canvas' )
        const ctx = canvas.getContext( '2d' )
        const canvasDownload = document.createElement( 'canvas' )
        const ctxDownload = canvasDownload.getContext( '2d' )

        canvasDownload.width = this.state.imageWidth
        canvasDownload.height = this.state.imageHeight

        const img = new Image ()
        const adjusted = this.setNewSize( svg, this.state.imageWidth, this.state.imageHeight )
        const namespaced = this.addNameSpace( adjusted )
        const escaped = this.encodeSVG( namespaced )
        
        this.state.svgDownloadLink = `data:image/svg+xml,${escaped}`

        img.src = this.state.svgDownloadLink
        
        let _this = this
        img.onload = function () {
            ctx.drawImage( img, 0, 0 )
            ctxDownload.drawImage( img, 0, 0 )
            _this.state.pngDownloadLink = canvasDownload.toDataURL( 'image/png' )
            _this.state.jpgDownloadLink = canvasDownload.toDataURL( 'image/jpeg' )
        }
    },
    // Set the desired download size.
    setNewSize ( data, width, height ) {
        let x = 0
        let y = 0
        let newWidth = 2000
        let newHeight = 2000
        let newCanvasWidth = 324
        let newCanvasHeight = 324
      
        if ( width > height ) {
            newWidth = ( width / height ) * newHeight
            newCanvasHeight = ( height / width ) * newCanvasWidth
            x = -Math.abs( ( newHeight / 2 ) - ( newWidth / 2 ) )
        } else if ( width < height ) {
            newHeight = ( height / width ) * newWidth
            newCanvasWidth = (width / height) * newCanvasHeight
            y = -Math.abs( ( newHeight / 2 ) - ( newWidth / 2 ) )
        }
        
        canvas.width = newCanvasWidth
        canvas.height = newCanvasHeight
        
        data = data.replace( /viewBox="0 0 2000 2000"/, `viewBox="${x} ${y} ${newWidth} ${newHeight}"` )
        
        return data
    },
    // Add xmlns namespace and add style attributes to the SVG.
    addNameSpace ( data ) {
        if ( data.indexOf( 'http://www.w3.org/2000/svg' ) < 0 ) {
            data = data.replace( /<svg/g, `<svg xmlns="http://www.w3.org/2000/svg"` )
        }

        const regex = /(style=".+")/
        let style = data.match( regex, 'style="background-color: rgb(242, 186, 66);color: rgb(0, 77, 128);"' )[0]
        let style2 = style.match( regex )[0]
        style2 = style2.replace( /;"/, ';width: 100%; height: auto;"' )
        data = data.replace( regex, style2 )
        return data
    },
    // Encode the SVG to convert characters to HTML entities.
    encodeSVG ( data ) {
        const symbols = /[\r\n%#()<>?\[\\\]^`{|}= ]/g
        data = data.replace( /'/g, '"' )
        data = data.replace( />\s{1,}</g, "><" )
        data = data.replace( /\s{2,}/g, " " )

        return data.replace( symbols, encodeURIComponent )
    },
    // Update the image size when the pre-defined size selector is changed.
    updateSize ( selectedSize ) {
        const newSize = this.state.presetSizes.filter( ( size ) => size.name === selectedSize )
        this.state.selectedSize = newSize[0].name
        if ( this.state.selectedSize != 'Custom' ) {
            this.state.imageWidth = newSize[0].width
            this.state.imageHeight = newSize[0].height
        }
        this.createDownloadLinks()
    },
    // Update the image size when the height or width inputs are changed.
    doneTyping (e) {
        if ( e.target.value == '' ) return

        this.state.imageTooBig = ( e.target.value > 10000 ) ? true : false
        this.state.imageTooSmall = ( e.target.value < 50 ) ? true : false
        
        if ( e.target.id === 'width-adjust' ) {
            this.state.imageWidth = parseInt( e.target.value )
        } else if ( e.target.id === 'height-adjust' ) {
            this.state.imageHeight = parseInt( e.target.value )
        }
        
        this.state.selectedSize = ''
        this.state.presetSizes.forEach( ( size ) => {
            if ( size.width === this.state.imageWidth && size.height == this.state.imageHeight ) {
                this.state.selectedSize = size.name
            }
        })
        if ( this.state.selectedSize == '' ) this.state.selectedSize = 'Custom'
        
        if ( this.state.imageTooBig || this.state.imageTooSmall ) return
        this.createDownloadLinks()
    }
}