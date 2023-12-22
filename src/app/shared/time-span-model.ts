export class TimeSpan {

    Hour: number = 0;
    Minute: number = 0;
    Second: number = 0;
    Sinal: number = 1;
    get TotalMinutes(): number {
        return this.Hour * 60 + this.Minute;
    }

    toString() {
        return `${this.formatHora(this.Hour)}:${this.formatHora(this.Minute)}`;
    }

    public ToString(mask: string = "HH:mm"): string {
        if (mask == "HH:mm")
            return toString();
        return `${this.formatHora(this.Hour)}:${this.formatHora(this.Minute)}:${this.formatHora(this.Second)}`;
    }
    constructor(timeSpan: string = '0') {
        this.createTS(timeSpan);
    }

    private createTS(timeSpan: string) {
        if (timeSpan.indexOf("_") > - 1) {
            this.Hour = 0;
            this.Minute = 0;
            return;
        }


        this.Sinal = timeSpan.indexOf('-') == -1 ? 1 : -1;

        var ts = timeSpan.replace("-", "").split(':');

        if (ts.length == 1) {
            var minutes = parseInt(timeSpan);
            this.Hour = parseInt((minutes / 60).toString());
            this.Minute = minutes % 60;
            return;
        }

        this.Hour = parseInt(ts[0]);
        this.Minute = parseInt(ts[1]);
        this.Second = ts.length == 3 ? parseInt(ts[2]) : 0;
    }

    // get() {
    //     return this.toString();
    // }

    // set(e) {
    //     this.createTS(e);
    // }

    set toInput(e) {
        this.createTS(e);
    }

    get toInput() {
        return this.toString();
    }

    public DiferencaHoras(parcela2: TimeSpan): TimeSpan {
        return new TimeSpan((this.TotalMinutes - parcela2.TotalMinutes).toString());
    }

    public SomaHoras(parcela2: TimeSpan): TimeSpan {
        return new TimeSpan((this.TotalMinutes + parcela2.TotalMinutes).toString());
    }

    private formatHora(hora: number) {
        if (hora < 10) {
            return '0' + hora;
        }
        return hora;
    }

}
