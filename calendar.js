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

                        return {
                            title: event.Buque,
                            start: new Date(llegada.substring(6,10),llegada.substring(3,5) - 1,llegada.substring(0,2)),
                            end: new Date(partida.substring(6,10),partida.substring(3,5) - 1,partida.substring(0,2)),
                            location: agente // LOCATION = AGENTE
                        }
                    })
                    successCallback(events)
                })
                .catch(function(error){
                    failureCallback(error)
                })
        },

        eventContent: function(info){
            console.log(info)
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