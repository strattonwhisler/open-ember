import { fromEvent, map } from 'rxjs';
import { capacitorPreferencesAdapter } from './capacitor-preferences.adapter';
import { PersistentBehaviorSubject } from './persistent-behavior-subject';

it.todo('PersistentBehaviorSubject');

const theme$ = new PersistentBehaviorSubject(
  'dark',
  capacitorPreferencesAdapter('user-theme')
);

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
document.body.appendChild(checkbox);

theme$.subscribe((theme) => {
  if (theme === 'dark') {
    document.body.style.backgroundColor = 'black';
    checkbox.checked = true;
  } else {
    document.body.style.backgroundColor = 'white';
    checkbox.checked = false;
  }
});

fromEvent(checkbox, 'checked')
  .pipe(
    map((event) => (event.target as HTMLInputElement)!.checked),
    map((checked) => (checked ? 'dark' : 'light'))
  )
  .subscribe(theme$);
