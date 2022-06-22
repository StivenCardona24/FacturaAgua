
//LOGICA
//objeto de la clase de vue
//es variable publica-global porque se accedera desde el index.html
var app = new Vue({
  el: '#app',
  data: {
      list: [
          {id: 1, name: 'JUAN', stratum: "1", consumption: 100, priceM:250, fixed_charge:2300, subs: 920, total: 26380},
          {id: 2, name: 'CARLOS', stratum: "2", consumption: 100, priceM:350, fixed_charge:3200, subs: 960, total: 37240},
      ],
  uname: "",
  stratum: "",
  consumption: "",
  subs: "",
  total_neto: 0,
  option: null,
  prom1: 0,
  prom2: 0,
  prom3: 0,
  total1: 0,
  total2: 0,
  total3: 0,
  g_total: 0,
  cargo:0,
  price:0,
  ward: false

  
  },
  methods: {
      bill(item){

        this.uname= item.name;
        this.stratum = item.stratum;
        this.consumption = item.consumption;
        this.cargo= item.fixed_charge;
        this.subs= item.subs;
        this.total_neto =item.total;


        this.ward= true;
          this.option = true
          
      },


      report(){
          let c1 = 0;
          let c2 = 0;
          let c3 = 0;

          this.prom1 = 0;
          this.prom2 = 0;
          this.prom3 = 0;
          this.total1 = 0;
          this.total2 = 0;
          this.total3 = 0;
          this.g_total = 0;

          this.list.forEach(item => {
              if (item.stratum == 1) {
                  this.prom1 += item.consumption;
                  console.log(this.prom1)
                  this.total1 += item.total;
                  c1++;
              }
              if (item.stratum == 2) {
                  this.prom2 += item.consumption;
                  this.total2 += item.total;
                  c2++;
              }
              if (item.stratum == 3) {
                  this.prom3 += item.consumption;
                  this.total3 += item.total;
                  c3++;
              }
              this.g_total += item.total
          })

          this.prom1 = this.prom1 /c1;
          this.prom2 = this.prom2 /c2;
          this.prom3 = this.prom3 / c3;
          
          this.ward= true;
          this.option = false;
      },


      add(){

        if(this.uname != "" && this.stratum != "" && this.consumption !="")
        {
          switch(this.stratum) {
              case "1":
                  this.cargo =2300
                  this.subs = this.cargo*0.4;
                  this.price= 250;
                  this.total_neto = this.consumption *  this.price - this.subs + this.cargo;
                  break;
              case "2":
                this.cargo = 3200;
                this.price= 350;

                  this.subs = this.cargo*0.3;
                  this.total_neto = this.consumption * this.price - this.subs  + this.cargo;
                  break;
              case "3":
                  this.cargo = 3900,
                  this.price= 460;
                  this.subs = this.cargo*0.1;
                  this.total_neto = this.consumption * this.price - this.subs  + this.cargo;
                  break;
              default:
                  break;
          }
          
          this.list.push({
              id: this.list.length + 1,
              name: this.uname.toUpperCase(),
              stratum: this.stratum,
              consumption: this.consumption,
              priceM: this.price,
              fixed_charge: this.cargo,
              subs: this.subs,
              total: this.total_neto
          });

          this.bill();
        }
        else{
            alert("Debes ingresar toda la información")
        }
      },

      cerrar(){
          this.ward = false;
      }
  }
  //v-for="i in array" es una directiva de bue que permite recorrer un arreglo
});