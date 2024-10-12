document.addEventListener('DOMContentLoaded', function() {

    let request_calendar = "./events.json"

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: '100%',
        events:function(info, successCallback, failureCallback){
            fetch(request_calendar)
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    console.log(data)
                    let events = data.map(function(event){

                        let llegada = event.Llegada 
                        let partida = event.Partida
                        let agente;
                        if (event.Agente === "AGENCIA MARITIMA INTERNACIONAL  SA"){
                            agente = "AMI"
                        }else if (event.Agente === "CRUISING USHUAIA SA"){
                            agente = "ISA"
                        }else if (event.Agente === "ADAMANTO S.R.L"){
                            agente = "SEALAND"
                        }

                        let fechaInicio = new Date(parseInt( llegada.substring(6,10) ), parseInt( llegada.substring(3,5) )- 1 , parseInt( llegada.substring(0,2) ) )
                        let fechaFin = new Date(parseInt( partida.substring(6,10) ), parseInt( partida.substring(3,5) )- 1 , parseInt( partida.substring(0,2) ) )
                        let info = {
                            title: event.Buque,
                            start: fechaInicio,
                            end: fechaFin.setDate(fechaFin.getDate() + 1), // devuelve el dia siguiente, para que se visualizen correctamente los eventos del calendario
                            location: agente // LOCATION = AGENTE
                        }
                        return info
                    })
                    successCallback(events)
                })
                .catch(function(error){
                    failureCallback(error)
                })
        },

        eventContent: function(info){
            return {
                html: `
                <div style="border: 1px solid">
                    <div><strong>${info.event._def.title}</strong></div>
                    <div>${info.event.extendedProps.location}</div>
                </div>
                `
            }
        }});
    calendar.render();
});
