import {Directive, ElementRef, Input, ViewContainerRef, AfterViewInit} from '@angular/core';

interface ngAfterViewInit {
}

@Directive({
  selector: '[menuInfoUser]'
})
export class MenuInfoUserDirective implements ngAfterViewInit{
  viewRef;
  @Input ('menuInfoUser') menuInfoUser;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef
  ) { }

  ngAfterViewInit() {

    this.menuInfoUser.closeChange.subscribe( () => {
      this.close(null);
    })

    this.close(null);

    this.elementRef.nativeElement.addEventListener('click', event => {
      let pos = this.elementRef.nativeElement;
      pos = pos.getBoundingClientRect();

      let position = {
        'x': pos.right,
        'y': pos.top
      }
      this.render(position);
    });

    document.addEventListener('mouseup', (e) => {
      if(this.elementRef.nativeElement !== e.target) {
        this.close(e.target);
      }
    });
    document.addEventListener('scroll', (e) => {
      if(this.elementRef.nativeElement !== e.target) {
        this.close(e.target);
      }
    });
    document.addEventListener('resize', (e) => {
      if (this.elementRef.nativeElement !== e.target) {
        this.close(e.target);
      }
    });
    document.addEventListener('touchend', (e) => {
      if(this.elementRef.nativeElement !== e.target) {
        this.close(e.target);
      }
    });
  }


    render(coordenada) {
      this.viewRef = this.viewContainerRef.createEmbeddedView(this.menuInfoUser.templateRef);
      this.viewRef.detectChanges();

      this.viewRef.rootNodes.forEach(rootNode => {
        rootNode.style = 'position: absolute; top:' + (coordenada.y) + 'px;' + 'left:' + (coordenada.x - 160) + 'px;' + 'z-index: 24;';
        document.body.appendChild(rootNode);
        if(rootNode.classList == '') {
          rootNode.classList = 'opPerfil off';
        }

        if (rootNode.clientWidth && rootNode.classList != 'opPerfil on') {
          // console.log(rootNode);
          rootNode.classList = 'opPerfil on';

        }
      });
    }

    close(e) {
    // console.log(this.elementRef.nativeElement);
    // console.log(e);

      if (this.viewContainerRef.length) {
        console.log('Sumiu');
        const viewRef = this.viewRef;

        viewRef.rootNodes.forEach(rootNode => {
          if (rootNode.classList) {
            rootNode.classList = 'opPerfil off';
          }
        });

        setTimeout(() => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef)), 400);
      }
    }


}
