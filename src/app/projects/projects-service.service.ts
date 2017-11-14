import {Injectable} from '@angular/core';
import {CoreService} from '../Services/core.service';
import {DadosDeUsuarioService} from '../Services/dados-de-usuario.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Router} from "@angular/router";
import {PopupConfirmacaoService} from "../components/popup-confirmacao/popup-confirmacao.service";
import {SnackbarsService} from "../components/snackbars/snackbars.service";
import {NotificationService} from "../notification/notification.service";

@Injectable()
export class ProjectsServiceService {

  constructor(private http: Http,
              private router: Router,
              private core: CoreService,
              private dados: DadosDeUsuarioService,
              private popupConfirmacao: PopupConfirmacaoService,
              private snackbar: SnackbarsService,
              private notificationService: NotificationService) {
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
    let page = document.querySelector('.container[_ngcontent-c6]');
    page.classList.remove('overflowAuto');
    page.classList.add('overflowHidden');
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
          this.snackbar.inserirSnackbar('Excluido com sucesso!')
          console.log(res);
        }, error => {
          console.log(error);
        });
    }
  }

  fechaDetailProject() {
    this.situacaoDetailProject = false;
    this.router.navigate(['main']);
    let page = document.querySelector('.container[_ngcontent-c6]');
    page.classList.add('overflowAuto');
    page.classList.remove('overflowHidden');

  }

  pesquisarMembros(idproject) {
    const parm = this.campoDePesquisa;
    if (parm.length > 0) {
      if (this.dados.getCookieTokken()) {
        var url = 'http://' + this.core.ipDaApi + '/searchMembers/' + idproject;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
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
        this.snackbar.inserirSnackbar('Usuario Adicionado Com Sucesso!');
        this.campoDePesquisa = '';
        this.detailProject(idProject);
      }, error => {
        console.log(error);
        this.pesquisaMembros = '';
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

      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.dados.getCookieTokken()
      });

      let options = new RequestOptions({headers: headers, body: params});
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

      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.dados.getCookieTokken()
      });

      let options = new RequestOptions({headers: headers});
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

  changeProject(idProject, name, descrip, base64) {
    var url = 'http://' + this.core.ipDaApi + '/project/' + idProject;
    var json = JSON.stringify(
      {
        nameProject: name,
        description: descrip,
        imgBase64: base64
      }
    );
    console.log(json);

    const params = json;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.dados.getCookieTokken());
    return this.http.put(url, params, {headers: headers})
      .subscribe((res) => {
        console.log(res.json());
        this.snackbar.inserirSnackbar('Projeto alterado com sucesso!');
        this.notificationService.searchNotification();
      }, error => {
        console.log(error);
      });
  }


}
