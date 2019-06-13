new Vue({
  el: "#app",

  data: {
    monedas: {},
    cantidad: 0,
    from: 'EUR',
    to: 'USD',
    result: 0
  },
  mounted() {

    this.getMonedas()

  },
  computed: {

    formatearMonedas() {

      return Object.values(this.monedas);
    },

    calcularResultado() {
      return (Number(this.cantidad) * this.result).toFixed(3);
    },
   
    deshabilitado() {
      return this.cantidad === 0 || !this.cantidad;
    }
  },

  methods: {

    getMonedas() {
      const monedas = localStorage.getItem("monedas");

      if (monedas) {
        this.monedas = JSON.parse(monedas);
        return;
      }

      axios.get('https://free.currconv.com/api/v7/currencies?apiKey=595640c0c2bb53f0b7d5')
        .then(response => {
          this.monedas = response.data.results;
          localStorage.setItem('monedas',
            JSON.stringify(response.data.results));
        });

    },

  convertirMoneda() {
      const busqueda = `${this.from}_${this.to}`;
      axios.get(`https://free.currconv.com/api/v7/convert?q=${busqueda}&apiKey=b097ab295f9b4736d1c6`)
        .then((response) => {
          console.log(response)
      this.result = response.data.results[busqueda].val;
        })
    }
  },
 

  watch: {
    from() {
      this.result = 0;
    },

    to() {
      this.result = 0;
    }
  }

});
//tu url
//axios.get(`https://free.currconv.com/api/v7/convert?q=${busqueda}&compact=ultra&apiKey=b097ab295f9b4736d1c6`)
//la mia
//axios.get(`https://free.currconv.com/api/v7/convert?q=${busqueda}&apiKey=595640c0c2bb53f0b7d5`)
