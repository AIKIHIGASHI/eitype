export const state = () => ({
  errorMessage: '',
})

export const getters = {
  errorMessage: (state) => state.errorMessage,
}

export const mutations = {
  errorMessage(state, error) {
    state.errorMessage = error
  },
  deleteErrorMessage(state) {
    state.errorMessage = ''
  },
}

export const actions = {
  errorMessage({ commit }, error) {
    switch (error.code) {
    case 'auth/cancelled-popup-request':
    case 'auth/popup-closed-by-user':
      return commit('errorMessage', null)
    case 'auth/email-already-in-use':
      if (method.indexOf('signup') !== -1) {
        return commit('errorMessage', 'このメールアドレスは使用されています')
      } else {
        return commit('errorMessage', 'メールアドレスまたはパスワードが違います')
      }
    case 'auth/invalid-email':
      return commit('errorMessage', 'メールアドレスの形式が正しくありません')
    case 'auth/user-disabled':
      return commit('errorMessage', 'サービスの利用が停止されています')
    case 'auth/user-not-found':
      return commit('errorMessage', 'メールアドレスまたはパスワードが違います')
    case 'auth/user-mismatch':
      if (method === 'signin/popup') {
        return commit('errorMessage', '認証されているユーザーと異なるアカウントが選択されました')
      } else {
        return commit('errorMessage', 'メールアドレスまたはパスワードが違います')
      }
    case 'auth/weak-password':
      return commit('errorMessage', 'パスワードは6文字以上にしてください')
    case 'auth/wrong-password':
      return commit('errorMessage', 'メールアドレスまたはパスワードが違います')
    case 'auth/popup-blocked':
      return commit('errorMessage', '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください')
    case 'auth/operation-not-supported-in-this-environment':
    case 'auth/auth-domain-config-required':
    case 'auth/operation-not-allowed':
    case 'auth/unauthorized-domain':
      return commit('errorMessage', '現在この認証方法はご利用頂けません')
    case 'auth/requires-recent-login':
      return commit('errorMessage', '認証の有効期限が切れています')
    default:
      if (method.indexOf('signin') !== -1) {
        return commit('errorMessage', '認証に失敗しました。しばらく時間をおいて再度お試しください')
      } else {
        return commit('errorMessage', 'エラーが発生しました。しばらく時間をおいてお試しください')
      }
    }
  },
  deleteErrorMessage({ commit }) {
    commit('deleteErrorMessage')
  },
}
