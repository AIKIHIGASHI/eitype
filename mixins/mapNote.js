import { mapGetters, mapActions } from 'vuex'
export const mapNote = {
  computed: {
    ...mapGetters('note', [
      'redNote',
      'blueNote',
      'yellowNote',
      'greenNote',
      'purpleNote',
    ]),
  },
  methods: {
    ...mapActions('note', [
      'redNoteOpen',
      'blueNoteOpen',
      'yellowNoteOpen',
      'greenNoteOpen',
      'purpleNoteOpen',
    ]),
  }
}
