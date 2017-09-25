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
      this.close();
    })

    this.close();

    this.elementRef.nativeElement.addEventListener('click', event => {
      let pos = this.elementRef.nativeElement;
      pos = pos.getBoundingClientRect();
      let position = {
        'x': pos.left,
        'y': pos.top
      }
      this.render(position);
    });

    document.addEventListener('mouseup', (e) => {
      if(this.elementRef.nativeElement !== e.target) {
        this.close();
      }
    });
    document.addEventListener('scroll', (e) => {
      if(this.elementRef.nativeElement !== e.target) {
        this.close();
      }
    });
    document.addEventListener('resize', (e) => {
      if (this.elementRef.nativeElement !== e.target) {
        this.close();
      }
    });
    document.addEventListener('touchend', (e) => {
      if(this.elementRef.nativeElement !== e.target) {
        this.close();
      }
    });
  }


    render(coordenada) {
      this.viewRef = this.viewContainerRef.createEmbeddedView(this.menuInfoUser.templateRef);
      this.viewRef.detectChanges();

      this.viewRef.rootNodes.forEach(rootNode => {
        rootNode.style = 'position: absolute; top:' + (coordenada.y + 56) + 'px;' + 'left:' + coordenada.x + 'px;' + 'z-index: 24;';
        rootNode.classList = 'opPerfil';
        document.body.appendChild(rootNode);

        if (rootNode.clientWidth) {
          console.log(rootNode);
        }
      });
    }

    close() {
      if(this.viewContainerRef.length) {
        console.log('Sumiu');
        const viewRef = this.viewRef;

        viewRef.rootNodes.forEach(rootNode => {
          if(rootNode.classList) {
            // rootNode.classList.remove('open');
          }
        });

        setTimeout(() => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef)), 50);
      }
    }


}
