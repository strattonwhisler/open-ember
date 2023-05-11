import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionCreator, Creator } from '@ngrx/store';
import { of, OperatorFunction, pipe, tap } from 'rxjs';
import { concatMap } from 'rxjs/operators';


export const presentToast = (toastController: ToastController): OperatorFunction<ToastOptions, void> => pipe(
  concatMap(options => toastController.create({
    duration: 3000,
    ...options
  })),
  concatMap(toast => toast.present())
);

export const createErrorToastEffect = <AC extends ActionCreator<string, Creator<any[], { error: any }>>>(
  actionType: AC,
  options: ToastOptions
) => {
  const actions$ = inject(Actions);
  const toastController = inject(ToastController);

  return createEffect(() =>
    actions$.pipe(
      ofType(actionType),
      concatMap(({ error }) => of({
        icon: 'alert-circle-outline',
        ...options
      }).pipe(
        tap(() => console.error(error)),
        presentToast(toastController)
      ))
    ),
    { dispatch: false }
  );
};

export const createWarningToastEffect = <AC extends ActionCreator<string, Creator<any[], { error: any }>>>(
  actionType: AC,
  options: ToastOptions
) => {
  const actions$ = inject(Actions);
  const toastController = inject(ToastController);

  return createEffect(() =>
    actions$.pipe(
      ofType(actionType),
      concatMap(({ error }) => of({
        icon: 'warning-outline',
        ...options
      }).pipe(
        tap(() => console.warn(error)),
        presentToast(toastController)
      ))
    ),
    { dispatch: false }
  );
};


export const createInfoToastEffect = <AC extends ActionCreator>(
  actionType: AC,
  options: ToastOptions
) => {
  const actions$ = inject(Actions);
  const toastController = inject(ToastController);

  return createEffect(() =>
    actions$.pipe(
      ofType(actionType),
      concatMap(() => of({
        icon: 'information-circle-outline',
        ...options
      }).pipe(
        presentToast(toastController)
      ))
    ),
    { dispatch: false }
  );
};
