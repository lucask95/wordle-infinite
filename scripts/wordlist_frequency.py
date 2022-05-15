from asyncore import write
from typing import Set
from wordfreq import zipf_frequency, word_frequency

FILTER_NAMES = True
FREQUENCY_THRESHOLD = 2.4

def write_wordsandfreq_to_json(filename, words_with_freq):
  with open(filename, 'w+') as file:
    file.write('{\n    "items": {\n')
    for item in words_with_freq:
      s = '        "{0}": {1},\n'.format(item['word'], item['frequency'])
      file.write(s)
    file.write('    }\n}')

def word_to_entry(word):
  return {
    'word': word,
    'frequency': zipf_frequency(word, 'en')
  }

def lines_to_list(filename):
  with open(filename) as file:
    lines = []
    for line in file:
      lines.append(line.lower().strip())
    return lines

if __name__ == "__main__":
  word_list = lines_to_list('../data/wordlist.txt')
  words_with_freq = [word_to_entry(word) for word in word_list]
  words_with_freq = list(filter(lambda entry: entry['frequency'] >= FREQUENCY_THRESHOLD, words_with_freq))
  if FILTER_NAMES:
    name_list = lines_to_list('../data/nameslist.txt')
    name_set = set(name_list)
    words_with_freq = list(filter(lambda entry: entry['word'] not in name_set, words_with_freq))
  words_with_freq.sort(key=lambda entry: entry['frequency'])
  write_wordsandfreq_to_json('../data/words_with_frequencies.json', words_with_freq)