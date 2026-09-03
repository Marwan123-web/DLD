import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { switchMap, map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span
    class="icon-wrap"
    [style.width.px]="size()"
    [style.height.px]="size()"
    [innerHTML]="svgContent()"
    [attr.aria-label]="label() || null"
    [attr.role]="label() ? 'img' : null"
    [attr.aria-hidden]="label() ? null : 'true'"></span>`,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; line-height: 0; }
    .icon-wrap { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .icon-wrap ::ng-deep svg { width: 100%; height: 100%; display: block; }
  `],
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input<number>(24);
  readonly label = input<string>('');

  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  readonly svgContent = toSignal(
    toObservable(this.name).pipe(
      switchMap(name =>
        this.http.get(`assets/icons/${name}.svg`, { responseType: 'text' }).pipe(
          map(svg => this.sanitizer.bypassSecurityTrustHtml(svg)),
          catchError(() => of(this.sanitizer.bypassSecurityTrustHtml(''))),
        ),
      ),
    ),
    { initialValue: this.sanitizer.bypassSecurityTrustHtml('') },
  );
}
