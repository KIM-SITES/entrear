import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuoteMessage, validateQuote } from '../src/lib/quote.ts';
import { createServiceState, serviceFromSearch } from '../src/lib/service.ts';

const valid = { service: 'instalacao', environment: 'residencia', municipality: 'cotia', notes: '' };
test('recusa dados incompletos e valores fora das opções disponíveis', () => {
  assert.deepEqual(Object.keys(validateQuote({ ...valid, environment: null, municipality: null })), ['ambiente', 'municipio']);
  for (const field of ['service', 'environment', 'municipality']) {
    assert.equal(buildQuoteMessage({ ...valid, [field]: '__proto__' }), null);
  }
});
test('respeita o limite de observações e preserva texto sem interpretá-lo como HTML', () => {
  assert.ok(buildQuoteMessage({ ...valid, notes: 'a'.repeat(600) }));
  assert.equal(buildQuoteMessage({ ...valid, notes: 'a'.repeat(601) }), null);
  const result = buildQuoteMessage({ ...valid, notes: '  <b>Ambiente de exemplo</b>  ' });
  assert.ok(result.includes('Observações: <b>Ambiente de exemplo</b>'));
  assert.ok(result.includes('empresa fictícia'));
  assert.ok(!buildQuoteMessage(valid).includes('Observações:'));
});
test('gera mensagens corretas para os dois serviços e todas as regiões', () => {
  for (const service of ['instalacao', 'manutencao']) for (const municipality of ['cotia', 'itapevi', 'barueri', 'jandira', 'outra-localidade']) {
    const message = buildQuoteMessage({ ...valid, service, municipality, environment: 'pequeno-negocio' });
    assert.ok(message?.includes(service === 'instalacao' ? 'instalação' : 'manutenção'));
    assert.ok(message?.includes('Pequeno negócio'));
  }
});
test('normaliza o serviço da URL e sincroniza assinantes sem notificações duplicadas', () => {
  assert.equal(serviceFromSearch('?servico=manutencao'), 'manutencao');
  assert.equal(serviceFromSearch('?servico=invalido'), 'instalacao');
  const state = createServiceState('instalacao');
  const seen = [];
  const unsubscribe = state.subscribe(value => seen.push(value));
  state.set('manutencao'); state.set('manutencao'); unsubscribe(); state.set('instalacao');
  assert.deepEqual(seen, ['instalacao', 'manutencao']);
});
