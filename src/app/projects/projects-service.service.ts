import { Injectable } from '@angular/core';
import { CoreService } from '../Services/core.service';
import { DadosDeUsuarioService } from '../Services/dados-de-usuario.service';
import {Http, Headers, RequestOptions} from '@angular/http';
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
  pesquisaMembros;
  campoDePesquisa = '';
  blocks;


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
          // console.log(res);
        }, error => {
          console.log(error);
        });
    }
  }
  viewDetailProject(id) {
    if (this.dados.getCookieTokken()) {
      var url = 'http://' + this.core.ipDaApi + '/project/' + id;
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
      return this.http.get(url, {headers: headers})
        .map(res => res.json())
        .subscribe((res) => {
          this.project = res;
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
  pesquisarMembros(idproject) {
    const parm = this.campoDePesquisa;
    console.log(idproject);
    if(parm.length > 0) {
      if (this.dados.getCookieTokken()) {
        var url = 'http://' + this.core.ipDaApi + '/searchMembers/' + idproject;
        var headers = new Headers();
        // headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
        headers.append('Search', parm);
        return this.http.get(url, {headers: headers})
          .map(res => res.json())
          .subscribe((res) => {
          this.pesquisaMembros = res;
            console.log(res);
          }, error => {
            this.pesquisaMembros = null;
            console.log(error);
          });
      }
    } else {
      this.pesquisaMembros = null;
    }
  }
  addMembrosProject(idUser, idProject) {
    var url = 'http://' + this.core.ipDaApi + '/insertUser/' + idProject;
    var json = JSON.stringify(
      {
        idUser: idUser,
        permission: false
      }
    );
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());

    return this.http.post(url, params, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
        console.log(res)
        this.snackbar.chamaSnackbar('Usuario Adicionado Com Sucesso!');
        this.campoDePesquisa = '';

        const membros = document.querySelector('.membros');
        const resSearch = document.querySelector('#resSearch');

        resSearch.setAttribute('style', 'display: none');
        membros.setAttribute('style', 'display: block');
        // document.getElementById('pesquisa').setAttribute('value', '');
        this.detailProject(idProject);
      }, error => {
        console.log(error);
        // this.pesquisaMembros = '';

      });
  }
  delUserProject(idProject, idUser) {
    if (this.dados.getCookieTokken()) {
      let url = 'http://' + this.core.ipDaApi + '/userTeam/' + idProject;
      let json = JSON.stringify(
        {
          idusertarget: idUser
        }
      );
      let params = json;

      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.dados.getCookieTokken() });

      let options = new RequestOptions({ headers: headers, body: params });
      return this.http.delete(url, options)
        .map(res => res.json())
        .subscribe((res) => {
          console.log(res);
          this.detailProject(idProject);
        }, error => {
          console.log(error);
        });
    }
  }
  permissaoUserProject(idProject, idUser) {
    var url = 'http://' + this.core.ipDaApi + '/promoteUser/' + idProject;
    var json = JSON.stringify(
      {
        idusertarget: idUser,
      }
    );
    var params = json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());

    return this.http.put(url, params, {headers: headers})
      .map(res => res.json())
      .subscribe((res) => {
      this.detailProject(idProject)
        console.log(res)
      }, error => {
        console.log(error);

      });
  }
  sairUserProject(idProject) {
    if (this.dados.getCookieTokken()) {
      let url = 'http://' + this.core.ipDaApi + '/exitProject/' + idProject;

      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.dados.getCookieTokken() });

      let options = new RequestOptions({ headers: headers });
      return this.http.delete(url, options)
        .map(res => res.json())
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(['/main']);
          this.searchProjects()
        }, error => {
          console.log(error);
        });
    }
  }
  searchBlocks(id) {
    if (this.dados.getCookieTokken()) {
      var url = 'http://' + this.core.ipDaApi + '/project/blocks/' + id;
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
      return this.http.get(url, {headers: headers})
        .map(res => res.json())
    }
  }


}
