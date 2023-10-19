import { Component, OnInit, isDevMode } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-relatorio-aluno',
  templateUrl: './relatorio-aluno.component.html',
  styleUrls: ['./relatorio-aluno.component.css'],
  providers: [MessageService]
})
export class RelatorioAlunoComponent implements OnInit {

  constructor(private api: ApiTurmasService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.dataIni = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.dataFim = new Date(new Date().getFullYear(), new Date().getMonth() + 3, 1);
    this.dataFim.setDate(this.dataFim.getDate() - 1);
  }

  loading = false;
  dataIni;
  dataFim;

  dados;

  funDownload(id) {
    this.api.downloadPDF(id).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });
  }

  rodarRelatorio() {

    if (isDevMode()) {
      this.dataIni = new Date(2023, 3, 1);
      this.dataFim = new Date(2023, 3, 30);
    }

    this.dados = undefined;
    this.loading = true;
    let filtro = { "dataIni": this.dataIni, "dataFim": this.dataFim }
    this.api.postRelatorioAlunos(filtro)
      .then(x => {
        this.dados = x;
      })
      .catch(x => this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao Pesquisar` }))
      .finally(() => this.loading = false)
  }


}
