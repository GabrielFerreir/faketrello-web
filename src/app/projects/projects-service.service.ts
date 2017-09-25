import { Injectable } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';
import { Http, Headers } from '@angular/http';
import {Router} from "@angular/router";
import {PopupConfirmacaoService} from "../components/popup-confirmacao/popup-confirmacao.service";
import {SnackbarsService} from "../components/snackbars/snackbars.service";

@Injectable()
export class ProjectsServiceService {

  constructor(private http: Http,
              private router: Router,
              private core: CoreService,
              private dados: DadosDeUsuarioService,
              private popupConfirmacao: PopupConfirmacaoService,
              private snackbar: SnackbarsService) {
  }

  situacaoAddProjects = false;
  situacaoDetailProject = false;
  projects;
  project;


  ativaAddProjets() {
    if (this.situacaoAddProjects == false) {
      this.situacaoAddProjects = !this.situacaoAddProjects;
    }
  }
  fechaAddProjets() {
    if (this.situacaoAddProjects == true) {
      this.situacaoAddProjects = !this.situacaoAddProjects;
    }
  }
  criaProject(nome, descricao, img64) {
    var url = 'http://' + this.core.ipDaApi + '/project';
    var json = JSON.stringify(
      {
        nameProject: nome,
        description: descricao,
        imgBase64: img64
      }
    );
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());

    return this.http.post(url, params, {headers: headers})
      .map(res => res.json())
  }
  searchProjects() {
    if (this.dados.getCookieTokken()) {
      var url = 'http://' + this.core.ipDaApi + '/project';
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
      return this.http.get(url, {headers: headers})
        .map(res => res.json())
        .subscribe((res) => {
        this.projects = res;
          console.log(res);
        }, error => {
        console.log(error);
        });
    }
  }
  detailProject(id) {
    this.situacaoDetailProject = true;
    this.router.navigate(['main/alterarProject/' + id]);
    if (this.dados.getCookieTokken()) {
      var url = 'http://' + this.core.ipDaApi + '/project/' + id;
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
      return this.http.get(url, {headers: headers})
        .map(res => res.json())
        .subscribe((res) => {
          this.project = res;
          console.log(res);
          console.log(res);
        }, error => {
          console.log(error);
        });
    }
  }
  delProject(id) {
    if (this.dados.getCookieTokken()) {
      var url = 'http://' + this.core.ipDaApi + '/project/' + id;
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
      return this.http.delete(url, {headers: headers})
        .map(res => res.json())
        .subscribe((res) => {
          this.popupConfirmacao.fechaPopUpConfirmacao();
          this.searchProjects();
          this.snackbar.chamaSnackbar('Excluido com sucesso!')
          console.log(res);
        }, error => {
          console.log(error);
        });
    }
  }
  fechaDetailProject() {
    this.situacaoDetailProject = false;
    this.router.navigate(['main']);
  }


}
