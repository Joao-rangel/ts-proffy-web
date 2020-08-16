import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'

import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import './styles.css'

function TeacherForm() { /* declarando itens da agenda dos professores */
  const [name, setName] = useState('') /* criação de estados para armazenar data */
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([ /* useState permite atualizar a view poia o react o observa | useState tem um primeiro valor imutáveil e um segundo valor que quando declarado, substitui o primeiro. */
    { week_day: 0, from: '', to: '' },
  ])

  function addNewScheduleItem() { /* não é possível usar push por conta do useState, mas pode-se copiar o valor da primeira array para dentro da segunda (que vai sibstituir a primeira) */
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault() /* para não atualizar a pág quando o form for enviado */

    console.log([
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost
    ]);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Ajude a mudar o mundo, um aluno de cada vez!"
        description="Começe nos esnsinando sobre você."
      />

      <main>
        <form >
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome completo" value={name} onChange={(e) => { setName(e.target.value) }} />
            <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }} />
            <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }} />
            <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }} />

          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              options={[
                { value: 'Física', label: 'Física' },
                { value: 'Química', label: 'Química' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'História', label: 'História' },
                { value: 'Geografia', label: 'Geografia' },
              ]}
            />

            < Input name="cost" label="Valor hora-aula" value={cost} onChange={(e) => { setCost(e.target.value) }} />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                  + Novo horário
              </button>
            </legend>

            {scheduleItems.map(scheduleItem => { /* gera as inputs pra cada schedule enviado */
              return ( /* key obrigatorio */
                <div key={scheduleItem.week_day + scheduleItem.from} className="schedule-item">
                  <Select
                    name="week-day"
                    label="Dia da semana"
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />

                  <Input name="from" label="Das" type="time" />

                  <Input name="to" label="Até" type="time" />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit" onClick={handleCreateClass}>
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm